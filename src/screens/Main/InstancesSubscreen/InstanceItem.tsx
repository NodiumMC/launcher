import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Instance } from 'minecraft'
import { transition } from 'style'
import { Img } from 'components/utils/Img'
import { Text } from 'components/micro/Text'
import { join } from 'native/path'
import { exists } from 'native/filesystem'
import { Button } from 'components/micro/Button'
import { convertFileSrc } from '@tauri-apps/api/tauri'
import { Observer, useModule } from 'mobmarch'
import { GameProfileService } from 'core/services/GameProfile.service'
import { Input } from 'components/micro/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { inputValue } from 'utils/react'
import { Pair } from 'components/utils/Pair'
import { useOsInfo } from 'hooks'
import { InstanceStore } from 'minecraft/InstanceStore.service'
import { PopupService } from 'notifications'
import { Select } from 'components/micro/Select'

export interface InstanceItemProps {
  instance: Instance
}

const InstanceItemStyled = styled.div<{ unfolded?: boolean }>`
  display: flex;
  border: 1px solid ${({ theme }) => theme.master.shade()};
  border-radius: ${({ theme }) => theme.radius()};
  min-height: 80px;
  cursor: ${({ unfolded }) => (unfolded ? 'default' : 'pointer')};
  padding: 0 20px;
  flex-direction: column;
  flex-shrink: 0;
  ${transition('background-color, max-height')}
  &:hover {
    background-color: ${({ theme, unfolded }) =>
      !unfolded && theme.master.shade()};
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  width: 100%;
  gap: 24px;
  flex-shrink: 0;
`

const Icon = styled(Img)`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius()};
`
const Gap = styled.div`
  flex-grow: 1;
`

const Options = styled.div<{ unfolded?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: ${({ unfolded }) => (unfolded ? '200px' : '0')};
  transform: scaleY(${({ unfolded }) => (unfolded ? '1' : '0')});
  padding-bottom: ${({ unfolded }) => (unfolded ? '20px' : '0')};
  ${transition()}
`

const GenericOptions = styled.div`
  display: flex;
  gap: 20px;
  ${Input} {
    width: 100%;
  }
`

const WindowOptions = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  ${Input} {
    width: 73px;
  }
`

const SaveActions = styled(Pair)<{ visible?: boolean }>`
  overflow: hidden;
  max-height: ${({ visible }) => (visible ? '80px' : '0')};
  ${transition()}
`

const VersionSelect = styled(Select)`
  flex-shrink: 0;
`

export const InstanceItem: FC<InstanceItemProps> = Observer(({ instance }) => {
  const { data } = useOsInfo()

  const [unfolded, setUnfolded] = useState(false)
  const [iconSrc, setIconSrc] = useState<string | undefined>()
  const [vid, setVid] = useState(instance.settings.vid)
  const [name, setName] = useState(instance.settings.name)
  const [windowWidth, setWindowWidth] = useState(
    instance.settings.windowWidth ?? 1280,
  )
  const [windowHeight, setWindowHeight] = useState(
    instance.settings.windowHeight ?? 720,
  )
  const [alloc, setAlloc] = useState(instance.settings.alloc ?? 2048)
  const [saving, setSaving] = useState(false)

  const profileService = useModule(GameProfileService)
  const istore = useModule(InstanceStore)
  const popup = useModule(PopupService)

  useEffect(() => {
    const path = join(instance.path, 'icon.png')
    exists(path).then(exists => exists && setIconSrc(convertFileSrc(path)))
  }, [instance])

  const reset = useCallback(() => {
    setAlloc(instance.settings.alloc ?? 2048)
    setName(instance.settings.name)
    setWindowWidth(instance.settings.windowWidth ?? 1280)
    setWindowHeight(instance.settings.windowHeight ?? 720)
    setVid(instance.settings.vid)
    setUnfolded(false)
  }, [instance])

  const save = useCallback(() => {
    instance.settings.vid = vid
    instance.settings.name = name.trim()
    instance.settings.alloc = alloc
    instance.settings.windowHeight = windowHeight
    instance.settings.windowWidth = windowWidth
    setSaving(true)
    istore.saveInstance(instance.path).finally(() => setSaving(false))
  }, [instance, vid, name, alloc, windowWidth, windowHeight])

  const deleteInstance = useCallback(() => {
    popup.spawn({
      level: 'warn',
      title: `Удалить "${instance.settings.name}"?`,
      description:
        'Это приведёт к удалению всех сохранений(миров), модов и настроек игры. Продолжить?',
      actions: [
        {
          label: 'Удалить',
          isDanger: true,
          action: () => istore.deleteInstance(instance.path),
        },
        {
          label: 'Отмена',
          isPrimary: true,
          action: close => close(),
        },
      ],
    })
  }, [instance])

  const availableToSave = useMemo(
    () =>
      !!(
        !saving &&
        (instance.settings.vid != vid ||
          instance.settings.name != name.trim() ||
          (instance.settings.alloc && instance.settings.alloc != alloc) ||
          (instance.settings.windowHeight &&
            instance.settings.windowHeight != windowHeight) ||
          (instance.settings.windowWidth &&
            instance.settings.windowWidth != windowWidth))
      ),
    [instance, vid, name, alloc, windowWidth, windowHeight, saving],
  )

  return (
    <InstanceItemStyled
      unfolded={unfolded}
      onClick={() => !unfolded && setUnfolded(true)}
    >
      <Header>
        <Icon src={iconSrc} />
        <Text shade={'low'}>{instance.settings.name}</Text>
        <Text shade={'high'} size={7}>
          {instance.settings.vid}
        </Text>
        <Gap />
        {unfolded && (
          <Button
            icon={'angle-up'}
            square
            outlined={false}
            shade={'high'}
            onClick={() => setUnfolded(false)}
          />
        )}
      </Header>
      <Options unfolded={unfolded}>
        <GenericOptions>
          <VersionSelect
            options={profileService.list.map(v => ({
              value: v.options.lastVersionId,
              label: (
                <Pair>
                  <Img src={v.options.icon} />
                  {v.options.name}
                </Pair>
              ),
            }))}
            onChange={setVid}
            value={vid}
          />
          <Input value={name} onChange={inputValue(setName)} />
        </GenericOptions>
        <WindowOptions>
          <Input
            type={'number'}
            min={100}
            max={7680}
            center
            value={windowWidth}
            onChange={inputValue(setWindowWidth, true)}
          />
          <Text shade={'high'} size={12}>
            <FontAwesomeIcon icon={'xmark'} />
          </Text>
          <Input
            type={'number'}
            min={100}
            max={4320}
            center
            value={windowHeight}
            onChange={inputValue(setWindowHeight, true)}
          />
          <Pair>
            <Text shade={'low'}>RAM</Text>
            <Input
              value={alloc}
              onChange={inputValue(setAlloc, true)}
              center
              type={'number'}
            />
            <Text shade={'high'}>MB</Text>
          </Pair>
        </WindowOptions>
        <Pair>
          <SaveActions visible={availableToSave}>
            <Button disabled={saving} onClick={reset}>
              Отмена
            </Button>
            <Button fetching={saving} primary onClick={save}>
              Сохранить
            </Button>
          </SaveActions>
          <Gap />
          <Button danger icon={'trash'} onClick={deleteInstance}>
            Удалить
          </Button>
        </Pair>
      </Options>
    </InstanceItemStyled>
  )
})
