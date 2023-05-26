import type { StyleFn } from '@lmpx/styled'

export const shapeStyles: StyleFn = ({ theme }) => ({
  height: '100%',
  borderRadius: theme.radius.md,
})
