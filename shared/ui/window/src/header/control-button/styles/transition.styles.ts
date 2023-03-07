import { StyleFn } from '@styled/tools'

export const transitionStyles: StyleFn = ({ theme }) => ({
  transitionProperty: 'color, backgroundColor',
  transitionDuration: theme.time.default,
})
