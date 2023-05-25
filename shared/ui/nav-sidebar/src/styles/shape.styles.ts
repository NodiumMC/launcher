import { StyleFn } from '@lmpx/styled'

export const shapeStyles: StyleFn = ({ theme }) => ({
  padding: theme.space.sm,
  width: `calc(38px + (${theme.space.sm} * 2))`,
})
