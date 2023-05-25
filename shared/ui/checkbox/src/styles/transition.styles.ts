import { StyleFn } from '@lmpx/styled'

export const transitionStyles: StyleFn = ({ theme }) => ({
  transitionProperty: 'background-color, borderColor, opacity',
  transitionDuration: theme.time.default,
})
