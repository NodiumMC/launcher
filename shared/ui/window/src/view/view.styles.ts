import { type StyleFn } from '@lmpx/styled'

export const styles: StyleFn = ({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.space.md,
})
