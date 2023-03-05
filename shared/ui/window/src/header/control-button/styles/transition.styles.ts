import { StyleFn } from '@style/tools'

export const transitionStyles: StyleFn = ({ theme }) => ({
  transitionProperty: 'color, backgroundColor',
  transitionDuration: theme.time.default,
})
