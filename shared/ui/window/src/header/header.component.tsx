import styled from '@emotion/styled'
import { styles } from './styles'
import { FC } from 'react'
import { HeaderProps } from './header.interface'
import { Title } from './title'
import { Content } from './content'
import { Group } from './group'
import { CloseControlButton, MaximizeControlButton, MinimizeControlButton } from './control-button'
import { FormattedMessage } from '@intl/react'

const HeaderElement = styled.div(styles)

export const Header: FC<HeaderProps> = ({ onMinimize, onToggleMaximize, onClose }) => (
  <HeaderElement data-tauri-drag-region>
    <Title>
      <FormattedMessage id={'shared.ui.window.title'} defaultMessage={'Nodium Launcher'} description={'Window title'} />
    </Title>
    <Content data-tauri-drag-region>
      <div />
      <Group>
        <MinimizeControlButton onClick={onMinimize} />
        <MaximizeControlButton onClick={onToggleMaximize} />
        <CloseControlButton onClick={onClose} isDestructive />
      </Group>
    </Content>
  </HeaderElement>
)
