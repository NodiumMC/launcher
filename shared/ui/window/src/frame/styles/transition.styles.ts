import type { StyleFn } from '@lmpx/styled'

export const transitionStyles: StyleFn = ({ theme }) => ({
  transitionProperty: 'background',
  transitionDuration: theme.time.default,
})
