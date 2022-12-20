import { FC, useState } from 'react'
import styled from 'styled-components'
import { WindowButton } from './WindowButton'
import { appWindow } from '@tauri-apps/api/window'
import { NetworkChecker } from 'network'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { normalizeColor } from 'utils'
import { useMod } from 'hooks/useMod'
import { observer } from 'mobx-react'

const ControlPlate = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

const Red = styled.div`
  color: ${({ theme }) => normalizeColor(theme.palette.red)};
`

const Yellow = styled.div`
  color: ${({ theme }) => normalizeColor(theme.palette.yellow)};
`

const NetworkStatus: FC = observer(() => {
  const module = useMod(NetworkChecker)

  return (
    <>
      {!module?.available ? (
        <Red>
          <FontAwesomeIcon icon={'triangle-exclamation'} />
        </Red>
      ) : module.avgPing > 300 ? (
        <Yellow>
          <FontAwesomeIcon icon={'triangle-exclamation'} />
        </Yellow>
      ) : null}
    </>
  )
})

export const WindowControl: FC = () => {
  const [maximized, setMaximized] = useState(false)
  return (
    <ControlPlate>
      <NetworkStatus />
      <WindowButton type={'minimize'} action={() => appWindow.minimize()} />
      <WindowButton
        type={'toggle'}
        action={() => {
          if (maximized) {
            appWindow.unmaximize()
            setMaximized(false)
          } else {
            appWindow.maximize()
            setMaximized(true)
          }
        }}
      />
      <WindowButton type={'close'} danger action={() => appWindow.close()} />
    </ControlPlate>
  )
}
