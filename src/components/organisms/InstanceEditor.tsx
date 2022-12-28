import { FC, useCallback, useState } from 'react'
import styled from 'styled-components'
import { Instance } from 'minecraft/Instance'
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
import { GameProfileService } from 'minecraft/GameProfile.service'
import { VersionPicker } from 'components/molecules/VersionPicker'
import { PublicVersion } from 'core/providers/types'
import { useI18N, useOnce } from 'hooks'
import { InstanceStore } from 'minecraft/InstanceStore.service'
import { Popup, PopupService, UpfallService } from 'notifications'
import { wait } from 'utils'
import { removeDir } from '@tauri-apps/api/fs'

export interface InstanceEditorProps {
  close?: () => void
  instance?: Instance
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

// !!!
// WARNING: HMR не работает для этой компоненты,
// вам нужно вручную перезагрузить страницу (F5)
// !!!
export const InstanceEditor: FC<InstanceEditorProps> = observer(({ instance, close }) => {
  const gp = useMod(GameProfileService)
  const istore = useMod(InstanceStore)
  const upfall = useMod(UpfallService)
  const popup = useMod(PopupService)
  const i18n = useI18N(t => t.minecraft.instance)
  const [versions, setVersions] = useState<PublicVersion[]>([])

  const repair = useCallback(() => {
    upfall.drop('default', i18n.instance_fixed, 'screwdriver-wrench')
    if (instance) instance.isInstalled = false
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
          action: async c =>
            instance &&
            (await removeDir(await instance.getInstanceDir(), { recursive: true }),
            istore.remove(instance!),
            close?.(),
            c()),
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

  useOnce(() => {
    gp.fetchAllVersions().then(setVersions)
  })

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
      name: instance?.name ?? '{provider} {version}',
      alloc: instance?.settings?.alloc ?? 2048,
      ww: instance?.settings?.windowWidth ?? 1280,
      wh: instance?.settings?.windowHeight ?? 720,
      jvmArgs: instance?.settings?.javaArgs?.join?.(' ') ?? '',
      minecraftArgs: instance?.settings?.minecraftArgs?.join?.(' ') ?? '',
      provider: instance?.provider ?? 'vanilla',
      vid: instance?.vid?.id ?? undefined,
    },
  })

  const submit = async (data: FormData) => {
    const vid = versions.find(v => v.id === data.vid)!
    const javaArgs = data.jvmArgs?.split('')
    const mcArgs = data.minecraftArgs?.split('')
    if (!vid || !vid.providers.includes(data.provider)) {
      setError('vid', { type: 'pattern' })
      return
    }
    if (instance) {
      if (instance.provider !== data.provider || instance?.vid?.id !== data.vid) instance.isInstalled = false
      instance.name = data.name
      instance.vid = vid
      instance.provider = data.provider
      instance.settings.alloc = data.alloc
      instance.settings ||= {}
      instance.settings.javaArgs = javaArgs
      instance.settings.minecraftArgs = mcArgs
      instance.settings.windowHeight = data.wh
      instance.settings.windowWidth = data.ww
      close?.()
      return wait(1000)
    } else {
      istore.instances.push(
        Instance.fromLocal({
          name: data.name,
          vid,
          provider: data.provider,
          settings: {
            alloc: data.alloc,
            windowWidth: data.ww,
            windowHeight: data.wh,
            minecraftArgs: mcArgs,
            javaArgs: javaArgs,
          },
        }),
      )
      close?.()
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
            <Pair>
              <Text shade={'medium'}>{i18n.window_size}: </Text>
              <Pair>
                <Input
                  center
                  type={'number'}
                  style={{ width: '64px' }}
                  {...register('ww', { required: true, min: 100 })}
                  invalid={!!errors.ww}
                />
                <FontAwesomeIcon icon={'xmark'} />
                <Input
                  center
                  type={'number'}
                  style={{ width: '64px' }}
                  {...register('wh', { required: true, min: 100 })}
                  invalid={!!errors.wh}
                />
              </Pair>
            </Pair>
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
