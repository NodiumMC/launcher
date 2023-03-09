import { StyleFn } from '@styled/tools'

export const transitionStyles: StyleFn = ({ theme }) => ({
  transitionProperty: 'color',
  transitionDuration: theme.time.default,
})
