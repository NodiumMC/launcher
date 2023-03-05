import { StyleFn } from '@style/tools'

export const transitionStyles: StyleFn = ({ theme }) => ({
  transitionProperty: 'color',
  transitionDuration: theme.time.default,
})
