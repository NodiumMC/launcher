import type { ComponentProps } from 'react'

export interface ButtonProps extends ComponentProps<'button'> {
  destructive?: boolean
}
