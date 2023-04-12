import { combine, ifProp, StyleFn } from 'styled'
import { rgba, shade } from 'polished'
import { ItemProps } from '../item.interface'

const base: StyleFn = ({ theme }) => ({
  backgroundColor: 'transparent',
  color: rgba(theme.palette.foreground, 0.5),
  fontSize: '16px',
  ':hover': {
    backgroundColor: shade(0.1, theme.palette.background),
  },
})

const active: StyleFn = ({ theme }) => ({
  color: theme.palette.primary._700,
  ':hover': {
    backgroundColor: 'transparent',
  },
})

export const appearanceStyles = combine(
  base,
  ifProp(({ isActive }: ItemProps) => isActive, active),
)
