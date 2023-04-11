import { StyleFn } from 'styled'

export const baseStyles: StyleFn = ({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space.md,
})
