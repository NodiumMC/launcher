import { StyleFn } from '@styled/tools'

export const transitionStyles: StyleFn = ({ theme }) => ({
  transitionProperty: 'background',
  transitionDuration: theme.time.default,
})
