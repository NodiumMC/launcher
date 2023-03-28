import { FC } from 'react'
import { View } from '@ui/window/src/view'
import { close, minimize, toggleMaximize } from '@native/window'
import { Frame } from './frame'
import { Header } from './header'
import { WindowProps } from './window.interface'
import { Divider } from './divider'

export const Window: FC<WindowProps> = ({ children }) => (
  <Frame>
    <Header onClose={close} onMinimize={minimize} onToggleMaximize={toggleMaximize} />
    <Divider />
    <View>{children}</View>
  </Frame>
)
