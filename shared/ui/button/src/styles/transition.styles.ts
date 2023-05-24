import { StyleFn } from '@lmpx/styled'

export const transitionStyles: StyleFn = ({ theme }) => ({
  transitionProperty: 'color, background-color, borderColor',
  transitionDuration: theme.time.default,
})
