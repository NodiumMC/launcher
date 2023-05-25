import { StyleFn } from '@lmpx/styled'

export const shapeStyles: StyleFn = ({ theme }) => ({
  aspectRatio: '1 / 1',
  borderRadius: theme.radius.md,
})
