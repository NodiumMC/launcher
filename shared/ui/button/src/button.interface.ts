import { ComponentProps } from 'react'
import { BaseScale } from '@theme/types'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiart'

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant
  destructive?: boolean
  square?: boolean
  size?: BaseScale
}
