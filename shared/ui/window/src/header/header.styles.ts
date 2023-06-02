import { type StyleFn } from '@lmpx/styled'

export const styles: StyleFn = ({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  justifyContent: 'end',
  gap: theme.space.md,
  padding: theme.space.md,
})
