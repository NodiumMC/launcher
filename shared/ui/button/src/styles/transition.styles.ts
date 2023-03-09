import { StyleFn } from '@styled/tools'

export const transitionStyles: StyleFn = ({ theme }) => ({
  transitionProperty: 'color, background-color, borderColor',
  transitionDuration: theme.time.default,
})
