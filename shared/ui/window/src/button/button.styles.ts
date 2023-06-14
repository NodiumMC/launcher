import type { StyleFn } from '@lmpx/styled'
import { ButtonProps } from './button.interface'

export const styles: StyleFn<ButtonProps> = ({ theme, destructive }) => ({
  borderRadius: theme.radius.md,
  width: '16px',
  backgroundColor: destructive ? theme.palette.error500 : 'transparent',
  borderWidth: '2px',
  borderStyle: 'solid',
  borderColor: destructive ? theme.palette.error500 : theme.palette.gray200,
  cursor: 'pointer',
})
