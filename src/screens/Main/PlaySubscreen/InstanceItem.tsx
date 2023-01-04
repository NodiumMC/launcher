import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { Instance } from 'minecraft/Instance'
import styled from 'styled-components'
import { Text } from 'components/atoms/Text'
import { Img } from 'components/utils/Img'
import { Button } from 'components/atoms/Button'
import { transition } from 'style'
import { useMod } from 'hooks/useMod'
import { Popup, PopupService, UpfallService } from 'notifications'
import { observer } from 'mobx-react'
import { InstanceEditor } from 'components/organisms/InstanceEditor'
import { open } from '@tauri-apps/api/shell'
import { useI18N } from 'hooks'
import { join } from 'native/path'
import { exists } from 'native/filesystem'
import { convertFileSrc } from '@tauri-apps/api/tauri'
import { erm } from 'debug'

export interface InstanceItemProps {
  instance: Instance
}

const Actions = styled.div`
  opacity: 0;
  align-items: center;
  gap: ${({ theme }) => theme.space()};
  ${transition('opacity')}
`

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: ${({ theme }) => theme.space(2)};
  border-radius: ${({ theme }) => theme.radius()};
  &:hover {
    ${Actions} {
      opacity: 1;
    }
  }
`

const Image = styled(Img)`
  height: 36px;
  aspect-ratio: 1 / 1;
  border-radius: ${({ theme }) => theme.radius()};
  background-color: ${({ theme }) => theme.master.shade()};
`

const NameContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(3)};
`

const Progress = styled.svg<{ stage: number }>`
  position: absolute;
  right: ${({ theme }) => theme.space(2)};
  height: 36px;
  width: 36px;
  z-index: -1;
  margin-top: -1px;
  margin-right: 1px;
  path {
    stroke: ${({ theme, stage }) =>
      stage === 0 ? theme.palette.orange : stage === 1 ? theme.palette.yellow : theme.accent.primary};
    stroke-dasharray: 133;
    ${transition('stroke-dashoffset')}
  }
`

interface StatusDotProps {
  active: boolean
}

const StatusDot = styled.div<StatusDotProps>`
  position: absolute;
  translate: -50% -50%;
  inset: 0;
  width: ${({ active }) => (active ? '8px' : 0)};
  height: ${({ active }) => (active ? '8px' : 0)};
  background-color: ${({ theme }) => theme.palette.green};
  border-radius: 50%;
  ${transition('all')}
`

const HideableButton = styled(Button)<{ hide: boolean }>`
  opacity: ${({ hide }) => +!hide};
`

export const InstanceItem: FC<InstanceItemProps> = observer(({ instance }) => {
  const upfall = useMod(UpfallService)
  const popup = useMod(PopupService)
  const i18n = useI18N(t => t.minecraft.instance)

  const launch = useCallback(() => {
    instance.launch().catch(code => {
      console.log(code)
      const lastEvent = instance.logs.last
      if ((typeof code === 'number' && code !== 0) || (typeof code === 'number' && lastEvent?.throwable))
        popup.create(Popup, {
          title: i18n.minecraft_crashed,
          description: (lastEvent?.message ?? '') + '\n\n' + (lastEvent?.throwable ?? ''),
          level: 'error',
          actions: [{ label: 'Ок', isPrimary: true, action: close => close() }],
        })
      else if (typeof code === 'string' || typeof code === 'object')
        upfall.drop('error', t => `${t.minecraft.instance.launch_failed}: ${erm(code)}`)
    })
  }, [])

  const kill = useCallback(() => {
    if (instance.child) instance.stop()
  }, [])

  const handle = useCallback(() => {
    if (instance.child) kill()
    else if (!instance.isInstalled) {
      instance
        .install()
        .catch(err => {
          if (err?.startsWith?.('Network Error')) upfall.drop('error', t => t.minecraft.instance.network_error)
          else upfall.drop('error', t => t.minecraft.instance.install_failed)
        })
        .then(launch)
    } else launch()
  }, [])

  const settings = useCallback(() => {
    popup.create(InstanceEditor, { instance })
  }, [popup])

  const [icon, setIcon] = useState<string | undefined>()

  useEffect(() => {
    void (async () => {
      const assetpath = join(instance.instanceDir, 'icon.png')
      if (!(await exists(assetpath))) return
      setIcon(convertFileSrc(assetpath))
    })()
  }, [instance])

  return (
    <Container>
      <NameContainer>
        <StatusDot active={!!instance.child || instance.busy} />
        <Image src={icon ?? instance.profile?.icon} />
        <Text weight={900} size={14}>
          {instance.displayName}
        </Text>
      </NameContainer>
      <Actions>
        <Button icon={'folder'} square outlined={false} onClick={async () => open(await instance.getInstanceDir())} />
        <Button icon={'gear'} square outlined={false} onClick={settings} disabled={instance.busy} />
        <HideableButton
          icon={instance.busy ? undefined : !instance.child ? (instance.isInstalled ? 'play' : 'download') : 'stop'}
          disabled={!!instance.child || !instance.isValid}
          primary
          square
          fetching={instance.busy}
          onClick={handle}
          hide={instance.busy}
        />
      </Actions>
      <Progress
        width="38"
        height="38"
        version="1.1"
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
        stage={instance.progress.stage ?? 0}
      >
        <path
          x={1}
          y={1}
          width={36}
          height={36}
          d={'m7 1h24a6 6 45 0 1 6 6v24a6 6 135 0 1-6 6h-24a6 6 45 0 1-6-6v-24a6 6 135 0 1 6-6z'}
          fill={'none'}
          strokeWidth={'2'}
          strokeDashoffset={instance.progress.progress.map(0, 100, 133 ,0)}
        />
      </Progress>
    </Container>
  )
})
