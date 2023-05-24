import { styled } from '@lmpx/styled'
import { FC } from 'react'
import { FaSolidXMarkIcon, FaRegularSquareIcon, FaSolidMinusIcon } from '@ui/icons'
import { ControlButtonProps } from './control-button.interface'
import { styles } from './styles'

const ControlButtonElement = styled.div<ControlButtonProps>(styles)

export const CloseControlButton: FC<ControlButtonProps> = ({ ...props }) => (
  <ControlButtonElement {...props}>
    <FaSolidXMarkIcon />
  </ControlButtonElement>
)

export const MinimizeControlButton: FC<ControlButtonProps> = ({ ...props }) => (
  <ControlButtonElement {...props}>
    <FaSolidMinusIcon />
  </ControlButtonElement>
)

export const MaximizeControlButton: FC<ControlButtonProps> = ({ ...props }) => (
  <ControlButtonElement {...props}>
    <FaRegularSquareIcon />
  </ControlButtonElement>
)
