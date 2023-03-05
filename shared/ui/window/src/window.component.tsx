import { FC } from 'react'
import { Frame } from './frame'
import { Header } from './header'
import { View } from '@ui/window/src/view'
import { WindowProps } from './window.interface'
import { close, minimize, toggleMaximize } from '@ipc/window'
import { Divider } from './divider'

export const Window: FC<WindowProps> = ({ children }) => (
  <Frame>
    <Header onClose={close} onMinimize={minimize} onToggleMaximize={toggleMaximize} />
    <Divider />
    <View>{children}</View>
  </Frame>
)
