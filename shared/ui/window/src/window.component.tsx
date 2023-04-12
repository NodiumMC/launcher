import { FC } from 'react'
import { close, minimize, toggleMaximize } from '@native/window'
import { View } from './view'
import { Frame } from './frame'
import { Header } from './header'
import { WindowProps } from './window.interface'
import { Container } from './container'

export const Window: FC<WindowProps> = ({ sidebar, children }) => (
  <Frame>
    {sidebar}
    <Container>
      <Header onClose={close} onMinimize={minimize} onToggleMaximize={toggleMaximize} />
      <View>{children}</View>
    </Container>
  </Frame>
)
