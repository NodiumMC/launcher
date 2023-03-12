import { combine, ifProp, match, StyleFn } from '@styled/tools'
import { ButtonProps } from '../button.interface'

const base: StyleFn = ({ theme }) => ({
  borderRadius: theme.radius.md,
})

const md: StyleFn = () => ({
  height: '38px',
  padding: `0 12px`,
})

const sm: StyleFn = () => ({
  height: '24px',
  padding: '0 6px',
})

const lg: StyleFn = () => ({
  height: '46px',
  padding: '0 24px',
})

const square: StyleFn = () => ({
  padding: 0,
  aspectRatio: '1 / 1',
})

export const shapeStyles = combine(
  base,
  match(({ size }: ButtonProps) => size, { sm, md, lg }),
  ifProp(({ square }: ButtonProps) => square, square),
)