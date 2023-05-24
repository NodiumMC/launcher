import { StyleFn } from '@lmpx/styled'

export const baseStyles: StyleFn = ({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space.md,
})
