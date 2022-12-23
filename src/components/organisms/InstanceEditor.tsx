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
import { useOnce } from 'hooks'
import { InstanceStore } from 'minecraft/InstanceStore.service'
import { Popup, PopupService, UpfallService } from 'notifications'
import { wait } from 'utils'

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
  const [versions, setVersions] = useState<PublicVersion[]>([])

  const repair = useCallback(() => {
    upfall.drop('default', 'Экземпляр будет переустановлен при следующем запуске', 'screwdriver-wrench')
    if (instance) instance.isInstalled = false
    close?.()
  }, [])

  const remove = useCallback(() => {
    popup.create(Popup, {
      level: 'question',
      title: 'Вы уверены?',
      description:
        'Вы действительно хотите удалить экземпляр игры? Это действие удалит только профиль экземпляра. Для полного удаления игровых данных выберите соответсвующее действие.',
      actions: [
        {
          label: 'Отмена',
          action: c => c(),
          isPrimary: true,
        },
        {
          label: 'Удалить',
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
            required: { value: true, message: 'Название обязательно' },
            maxLength: { value: 32, message: 'Слишком длинное название' },
            pattern: {
              value: /^[\w\s\u0400-\u04FF-_.()[\]#№/{}]+?$/,
              message: 'Название содержит недопустимые символы',
            },
          })}
          placeholder={'Название'}
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
              <Text shade={'medium'}>Размер окна: </Text>
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
            placeholder={'JVM аргументы'}
            error={errors.jvmArgs}
            {...register('jvmArgs', {
              required: false,
              pattern: {
                value: /^(((--\w{2,}([\w-]*)(=?".*")?)|(-\w))($|\s))+?$/,
                message: 'Некорректная строка аргументов',
              },
            })}
          />
          <Field
            placeholder={'Minecraft аргументы'}
            error={errors.minecraftArgs}
            {...register('minecraftArgs', {
              required: false,
              pattern: {
                value: /^(((--\w{2,}([\w-]*)(=?".*")?)|(-\w))($|\s))+?$/,
                message: 'Некорректная строка аргументов',
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
          <Button onClick={close}>Отмена</Button>
          <Button onClick={handleSubmit(submit)} primary disabled={versions.length === 0 || isSubmitting || !isValid}>
            {instance ? 'Сохранить' : 'Создать'}
          </Button>
        </Pair>
      </Actions>
    </Conatiner>
  )
})
