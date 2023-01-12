import { FC, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { Button } from 'components/atoms/Button'
import { Field } from 'components/molecules/Field'
import { observer } from 'mobx-react'
import { Pair } from 'components/utils/Pair'
import { Text } from 'components/atoms/Text'
import { Input } from 'components/atoms/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ProviderIcon, SupportedProviders } from 'core/providers'
import { useMod } from 'hooks/useMod'
import { VersionPicker } from 'components/molecules/VersionPicker'
import { PublicVersion } from 'core/providers/types'
import { useI18N, useOnce } from 'hooks'
import { Popup, PopupModule, UpfallModule } from 'notifications'
import { snapshot, wait } from 'utils'
import { exists, removeDir } from '@tauri-apps/api/fs'
import { GameProfileModule } from 'minecraft/game-profile'
import { InstanceModule } from 'minecraft/instance'
import { InstancesModule } from 'minecraft/instances'
import { nanoid } from 'nanoid/non-secure'
import { match, of } from 'error'
import { NoProfileException } from 'minecraft/instance/instance.exceptions'

export interface InstanceEditorProps {
  close?: () => void
  instance?: InstanceModule
}

const Conatiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space()};
  border: 2px solid ${({ theme }) => theme.master.shade()};
  border-radius: ${({ theme }) => theme.radius(2)};
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.master.back};
  padding: ${({ theme }) => theme.space(3)};
  height: 85%;
  width: 85%;
`

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(1)};
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space()};
  margin-top: ${({ theme }) => theme.space()};
`

interface FormData {
  name: string
  provider: SupportedProviders
  vid: string
  alloc: number
  ww: number
  wh: number
  jvmArgs?: string
  minecraftArgs?: string
}

const Group = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space(2)};
`

const StyledVersionPicker = styled(VersionPicker)`
  flex-grow: 1;
`

const VerticalGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space()};
  flex-direction: column;
`

const WindowSizeBox = styled.div`
  border: 2px solid ${({ theme }) => theme.master.shade()};
  border-radius: ${({ theme }) => theme.radius()};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding: ${({ theme }) => theme.space(3)};
  aspect-ratio: 16 / 9;
  gap: ${({ theme }) => theme.space()};
  svg {
    color: ${({ theme }) => theme.master.shade(0.3)};
  }
`

const BorderLessInput = styled(Input)`
  input {
    border: 0 !important;
  }
`

// !!!
// WARNING: HMR не работает для этой компоненты,
// вам нужно вручную перезагрузить страницу (F5)
// !!!
export const InstanceEditor: FC<InstanceEditorProps> = observer(({ instance, close }) => {
  const gp = useMod(GameProfileModule)
  const istore = useMod(InstancesModule)
  const upfall = useMod(UpfallModule)
  const popup = useMod(PopupModule)
  const i18n = useI18N(t => t.minecraft.instance)
  const [versions, setVersions] = useState<PublicVersion[]>([])

  const repair = useCallback(() => {
    upfall.drop('default', i18n.instance_fixed, 'screwdriver-wrench')
    if (instance) instance.repair()
    close?.()
  }, [])

  const remove = useCallback(() => {
    popup.create(Popup, {
      level: 'question',
      title: i18n.are_you_sure,
      description: i18n.are_you_want_to_delete,
      actions: [
        {
          label: i18n.full_delete,
          action: async c => {
            if (instance) {
              if (await exists(instance.location)) {
                await removeDir(instance.location, { recursive: true })
                istore.remove(instance!)
                close?.()
              } else {
                upfall.drop('warn', t => t.minecraft.instance.already_removed)
              }
              c()
            }
          },
        },
        {
          label: i18n.cancel,
          action: c => c(),
          isPrimary: true,
        },
        {
          label: i18n.remove,
          isDanger: true,
          action: c => {
            istore.remove(instance!)
            close?.()
            c()
          },
        },
      ],
    })
  }, [])

  useEffect(() => {
    gp.fetchAllVersions().then(setVersions)
  }, [gp.profiles])

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    defaultValues: {
      name: instance?.local?.name ?? '{provider} {version}',
      alloc: instance?.local?.settings?.alloc ?? 2048,
      ww: instance?.local?.settings?.windowWidth ?? 1280,
      wh: instance?.local?.settings?.windowHeight ?? 720,
      jvmArgs: instance?.local?.settings?.javaArgs?.join?.(' ') ?? '',
      minecraftArgs: instance?.local?.settings?.minecraftArgs?.join?.(' ') ?? '',
      provider: instance?.local?.provider ?? 'vanilla',
      vid: instance?.local?.version?.id ?? undefined,
    },
  })

  const submit = async (data: FormData) => {
    const vid = versions.find(v => v.id === data.vid)!
    const javaArgs = data.jvmArgs?.split(' ').filter(v => v)
    const mcArgs = data.minecraftArgs?.split(' ').filter(v => v)
    if (!vid || !vid.providers.includes(data.provider)) {
      setError('vid', { type: 'pattern' })
      return
    }
    if (instance) {
      if (instance.local.provider !== data.provider || instance?.local.version?.id !== data.vid) instance.repair()
      instance.local.name = data.name
      instance.local.version = vid
      instance.local.provider = data.provider
      instance.local.settings.alloc = data.alloc
      instance.local.settings ||= {}
      instance.local.settings.javaArgs = javaArgs
      instance.local.settings.minecraftArgs = mcArgs
      instance.local.settings.windowHeight = data.wh
      instance.local.settings.windowWidth = data.ww
      close?.()
      return wait(1000)
    } else {
      const newInstance = InstanceModule.fromJson({
        name: data.name,
        nid: nanoid(6),
        installed: false,
        logs: [],
        lastUsed: Date.now(),
        version: vid,
        provider: data.provider,
        location: null,
        settings: {
          alloc: data.alloc,
          windowWidth: data.ww,
          windowHeight: data.wh,
          minecraftArgs: mcArgs,
          javaArgs: javaArgs,
        },
      })
      try {
        await newInstance.init()
        istore.add(newInstance)
        close?.()
      } catch (e) {
        match({
          [of(NoProfileException)]() {
            setError('vid', { type: 'pattern' })
          },
        })(e)
      }
      return wait(2000)
    }
  }

  return (
    <Conatiner>
      <Content>
        <Field
          {...register('name', {
            required: { value: true, message: i18n.name_required },
            maxLength: { value: 32, message: i18n.name_too_long },
            pattern: {
              value: /^[\w\s\u0400-\u04FF-_.()[\]#№/{}]+?$/,
              message: i18n.name_invalid_pattern,
            },
          })}
          placeholder={i18n.name}
          error={errors.name}
        />
        <Group>
          <StyledVersionPicker
            providers={[
              { id: 'vanilla', label: ProviderIcon.vanilla },
              { id: 'fabric', label: ProviderIcon.fabric },
              { id: 'forge', label: ProviderIcon.forge },
              { id: 'quilt', label: ProviderIcon.quilt },
              { id: 'custom', label: ProviderIcon.custom },
            ]}
            versions={versions}
            provider={getValues('provider')}
            onProviderChange={value => (setValue('provider', value), clearErrors('vid'), trigger('provider'))}
            version={getValues('vid')}
            onVersionChange={value => (setValue('vid', value), clearErrors('vid'), trigger('vid'))}
            invalid={!!errors.vid}
          />
          <VerticalGroup>
            <Pair gap={'small'}>
              <Text shade={'medium'}>RAM: </Text>
              <Input
                center
                type={'number'}
                style={{ width: '64px' }}
                {...register('alloc', { required: true, min: 512 })}
                invalid={!!errors.alloc}
              />
              <Text shade={'medium'}>MB</Text>
            </Pair>
            <WindowSizeBox>
              <BorderLessInput
                center
                type={'number'}
                style={{ width: '64px' }}
                {...register('ww', { required: true, min: 100 })}
                invalid={!!errors.ww}
              />
              <FontAwesomeIcon icon={'xmark'} />
              <BorderLessInput
                center
                type={'number'}
                style={{ width: '64px' }}
                {...register('wh', { required: true, min: 100 })}
                invalid={!!errors.wh}
              />
            </WindowSizeBox>
          </VerticalGroup>
        </Group>
        <List>
          <Field
            placeholder={i18n.jvm_args}
            error={errors.jvmArgs}
            {...register('jvmArgs', {
              required: false,
              pattern: {
                value: /^(((--\w{2,}([\w-]*)(=?".*")?)|(-\w))($|\s))+?$/,
                message: i18n.invalid_args_string,
              },
            })}
          />
          <Field
            placeholder={i18n.minecraft_args}
            error={errors.minecraftArgs}
            {...register('minecraftArgs', {
              required: false,
              pattern: {
                value: /^(((--\w{2,}([\w-]*)(=?".*")?)|(-\w))($|\s))+?$/,
                message: i18n.invalid_args_string,
              },
            })}
          />
        </List>
      </Content>
      <Actions>
        <Pair>
          {instance && (
            <>
              <Button square danger icon={'trash'} onClick={remove} />
              <Button square icon={'screwdriver-wrench'} onClick={repair} />
            </>
          )}
        </Pair>
        <Pair>
          <Button onClick={close}>{i18n.cancel}</Button>
          <Button onClick={handleSubmit(submit)} primary disabled={versions.length === 0 || isSubmitting || !isValid}>
            {instance ? i18n.save : i18n.create}
          </Button>
        </Pair>
      </Actions>
    </Conatiner>
  )
})
