import { combine, ifProp, StyleFn, rgba } from '@lmpx/styled'
import { ItemProps } from '../item.interface'

const base: StyleFn = ({ theme }) => ({
  backgroundColor: 'transparent',
  color: rgba(theme.palette.foreground, 0.5),
  fontSize: '16px',
})

const active: StyleFn = ({ theme }) => ({
  color: theme.palette.primary._500,
})

export const appearanceStyles = combine(
  base,
  ifProp(({ isActive }: ItemProps) => isActive, active),
)
