import { StyleFn } from '@style/tools'

export const transitionStyles: StyleFn = ({ theme }) => ({
  transitionProperty: 'background',
  transitionDuration: theme.time.default,
})
