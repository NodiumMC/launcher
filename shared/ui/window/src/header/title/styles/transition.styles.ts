import { StyleFn } from '@lmpx/styled'

export const transitionStyles: StyleFn = ({ theme }) => ({
  transitionProperty: 'color',
  transitionDuration: theme.time.default,
})
