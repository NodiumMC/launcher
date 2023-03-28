import { styled } from 'styled'
import { FC } from 'react'
import { CloseWindowIcon, MaximizeWindowIcon, MinimizeWindowIcon } from '@ui/icons'
import { ControlButtonProps } from './control-button.interface'
import { styles } from './styles'

const ControlButtonElement = styled.div<ControlButtonProps>(styles)

export const CloseControlButton: FC<ControlButtonProps> = ({ ...props }) => (
  <ControlButtonElement {...props}>
    <CloseWindowIcon />
  </ControlButtonElement>
)

export const MinimizeControlButton: FC<ControlButtonProps> = ({ ...props }) => (
  <ControlButtonElement {...props}>
    <MinimizeWindowIcon />
  </ControlButtonElement>
)

export const MaximizeControlButton: FC<ControlButtonProps> = ({ ...props }) => (
  <ControlButtonElement {...props}>
    <MaximizeWindowIcon />
  </ControlButtonElement>
)
