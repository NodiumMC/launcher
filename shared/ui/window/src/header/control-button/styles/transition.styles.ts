import { StyleFn } from 'styled'

export const transitionStyles: StyleFn = ({ theme }) => ({
  transitionProperty: 'color, backgroundColor',
  transitionDuration: theme.time.default,
})
