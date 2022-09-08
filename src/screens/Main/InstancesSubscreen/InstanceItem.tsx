import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Instance } from 'minecraft'
import { transition } from 'style'
import { Img } from 'components/utils/Img'
import { Text } from 'components/micro/Text'
import { join } from '@tauri-apps/api/path'
import { exists } from 'native/filesystem'
import { Button } from 'components/micro/Button'
import { convertFileSrc } from '@tauri-apps/api/tauri'
import { Dropdown } from 'components/micro/Dropdown'
import { Observer, useModule } from 'mobmarch'
import { GameProfileService } from 'core/services/GameProfile.service'
import { Input } from 'components/micro/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { inputValue } from 'utils/react'
import { Pair } from 'components/utils/Pair'
import { useOsInfo } from 'hooks'
import { InstanceStore } from 'minecraft/InstanceStore.service'

export interface InstanceItemProps {
  instance: Instance
}

const InstanceItemStyled = styled.div<{ unfolded?: boolean }>`
  display: flex;
  border: 1px solid ${({ theme }) => theme.palette.back.shades[0]};
  border-radius: ${({ theme }) => theme.shape.radius[0]};
  min-height: 80px;
  cursor: ${({ unfolded }) => (unfolded ? 'default' : 'pointer')};
  padding: 0 20px;
  flex-direction: column;
  flex-shrink: 0;
  ${transition('background-color, max-height')}
  &:hover {
    background-color: ${({ theme, unfolded }) =>
      !unfolded && theme.palette.back.shades[0]};
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
  border-radius: ${({ theme }) => theme.shape.radius[0]};
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

  useEffect(() => {
    join(instance.path, 'icon.png').then(path =>
      exists(path).then(exists => exists && setIconSrc(convertFileSrc(path))),
    )
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
    instance.settings.name = name
    instance.settings.alloc = alloc
    instance.settings.windowHeight = windowHeight
    instance.settings.windowWidth = windowWidth
    setSaving(true)
    istore.saveInstance(instance.path).finally(() => setSaving(false))
  }, [instance, vid, name, alloc, windowWidth, windowHeight])

  const availableToSave = useMemo(
    () =>
      instance.settings.vid != vid ||
      instance.settings.name != name ||
      instance.settings.alloc != alloc ||
      instance.settings.windowHeight != windowHeight ||
      instance.settings.windowWidth != windowWidth,
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
        <Text shade={'high'} size={'s'}>
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
          <Dropdown
            items={profileService.profiles.map(v => ({
              value: v.lastVersionId,
              label: v.name,
              icon: <Img src={v.icon} />,
            }))}
            value={vid}
            onChange={setVid}
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
            onChange={inputValue(setWindowWidth)}
          />
          <Text shade={'high'} size={'l'}>
            <FontAwesomeIcon icon={'xmark'} />
          </Text>
          <Input
            type={'number'}
            min={100}
            max={4320}
            center
            value={windowHeight}
            onChange={inputValue(setWindowHeight)}
          />
          <Pair>
            <Text shade={'low'}>RAM</Text>
            <Input
              value={alloc}
              onChange={inputValue(setAlloc)}
              center
              type={'number'}
            />
            <Text shade={'high'}>MB</Text>
          </Pair>
        </WindowOptions>
        <SaveActions visible={availableToSave}>
          <Button disabled={saving} onClick={reset}>
            Отмена
          </Button>
          <Button fetching={saving} primary onClick={save}>
            Сохранить
          </Button>
        </SaveActions>
      </Options>
    </InstanceItemStyled>
  )
})
