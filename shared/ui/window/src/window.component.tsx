import { FC } from 'react'
import { Frame } from './frame'
import { WindowProps } from './window.interface'
import { Bordered } from './bordered'
import { Logo } from './logo'
import { Header } from './header'
import { View } from './view'
import { close, minimize } from '@native/window'
import { Button } from './button'

export const Window: FC<WindowProps> = ({ sidebar, children }) => (
  <Frame>
    <Logo data-tauri-drag-region />
    <Header data-tauri-drag-region>
      <Button onClick={minimize} />
      <Button onClick={close} destructive />
    </Header>
    <Bordered sides={['right']} gridArea='sidebar'>
      {sidebar}
    </Bordered>
    <View>{children}</View>
  </Frame>
)
