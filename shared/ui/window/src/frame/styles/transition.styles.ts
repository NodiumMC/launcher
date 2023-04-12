import { StyleFn } from 'styled'

export const transitionStyles: StyleFn = ({ theme }) => ({
  transitionProperty: 'background',
  transitionDuration: theme.time.default,
})
