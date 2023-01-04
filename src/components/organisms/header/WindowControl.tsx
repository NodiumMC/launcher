import { FC, useState } from 'react'
import styled from 'styled-components'
import { WindowButton } from './WindowButton'
import { appWindow } from '@tauri-apps/api/window'
import { NetworkChecker } from 'network'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMod } from 'hooks/useMod'
import { observer } from 'mobx-react'
import { NavLink } from 'react-router-dom'
import { Pair } from 'components/utils/Pair'

const ControlPlate = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(2)};
`

const Red = styled.div`
  color: ${({ theme }) => theme.palette.red};
`

const Yellow = styled.div`
  color: ${({ theme }) => theme.palette.yellow};
`

const NetworkStatus: FC = observer(() => {
  const module = useMod(NetworkChecker)

  return (
    <>
      {!module?.available ? (
        <Red>
          <FontAwesomeIcon icon={'triangle-exclamation'} />
        </Red>
      ) : module.avgPing > 500 ? (
        <Yellow>
          <FontAwesomeIcon icon={'triangle-exclamation'} />
        </Yellow>
      ) : null}
    </>
  )
})

const InfoIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.master.shade(0.5)};
`

export const WindowControl: FC = () => {
  return (
    <ControlPlate>
      <NetworkStatus />
      <Pair gap={'small'}>
        <NavLink to={'/about'}>
          <InfoIcon icon={'info-circle'} />
        </NavLink>
        <WindowButton type={'minimize'} action={() => appWindow.minimize()} />
        <WindowButton type={'toggle'} action={() => appWindow.toggleMaximize()} />
        <WindowButton type={'close'} danger action={() => appWindow.close()} />
      </Pair>
    </ControlPlate>
  )
}
