import styled from '@emotion/styled'
import { FC } from 'react'
import { ControlButtonProps } from './control-button.interface'
import { styles } from './styles'
import { CloseWindowIcon, MaximizeWindowIcon, MinimizeWindowIcon } from '@ui/icons'

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
