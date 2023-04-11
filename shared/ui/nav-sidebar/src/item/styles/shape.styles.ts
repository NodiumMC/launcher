import { StyleFn } from 'styled'

export const shapeStyles: StyleFn = ({ theme }) => ({
  aspectRatio: '1 / 1',
  borderRadius: theme.radius.md,
})
