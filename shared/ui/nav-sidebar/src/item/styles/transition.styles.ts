import { StyleFn } from 'styled'

export const transitionStyles: StyleFn = ({ theme }) => ({
  transitionProperty: 'all',
  transitionDuration: theme.time.default,
})
