import { combine, ifNotProp, ifProp, StyleFn } from 'styled'
import { ButtonProps } from '../button.interface'

const base: StyleFn<ButtonProps> = ({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.space.md,
})

const square: StyleFn = () => ({
  justifyContent: 'center',
})

const pointer: StyleFn = () => ({
  cursor: 'pointer',
})

export const baseStyles = combine(
  base,
  ifProp((props: ButtonProps) => props.square, square),
  ifNotProp((props: ButtonProps) => props.disabled, pointer),
)
