import { ComponentProps } from 'react'
import { BaseScale } from '@theme/types'

export type ButtonVariant = 'default' | 'primary' | 'secondary'

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant
  destructive?: boolean
  square?: boolean
  size?: BaseScale
}
