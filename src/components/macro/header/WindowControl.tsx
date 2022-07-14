import { FC, useState } from 'react'
import styled from 'styled-components'
import { WindowButton } from './WindowButton'
import { appWindow } from '@tauri-apps/api/window'

const ControlPlate = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

export const WindowControl: FC = () => {
  const [maximized, setMaximized] = useState(false)
  return <ControlPlate>
    <WindowButton type={'minimize'} action={() => appWindow.minimize()}/>
    <WindowButton type={'toggle'} action={() => {
      if(maximized) {
        appWindow.unmaximize()
        setMaximized(false)
      } else {
        appWindow.maximize()
        setMaximized(true)
      }
    }}/>
    <WindowButton type={'close'} danger action={() => appWindow.close()}/>
  </ControlPlate>
}
