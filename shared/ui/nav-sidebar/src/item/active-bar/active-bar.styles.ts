import { combine, ifProp, StyleFn } from 'styled'
import { ActiveBarProps } from './active-bar.interface'

const base: StyleFn = ({ theme }) => ({
  position: 'absolute',
  width: '3px',
  height: '40%',
  borderRadius: theme.radius.xs,
  left: '0',
  top: '50%',
  translate: '0 -50%',
  backgroundColor: 'transparent',
  transitionProperty: 'all',
  transitionDuration: theme.time.default,
})

const active: StyleFn = ({ theme }) => ({
  backgroundColor: theme.palette.primary._500,
})

const blurry: StyleFn = () => ({
  width: '15px',
  transitionDuration: '0',
})

export const styles = combine(
  base,
  ifProp(({ isActive }: ActiveBarProps) => isActive, active),
  ifProp(({ blurry }: ActiveBarProps) => blurry, blurry),
)
