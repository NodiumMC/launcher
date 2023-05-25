import { StyleFn } from '@lmpx/styled'

export const styles: StyleFn = ({ theme }) => ({
  flexGrow: 1,
  backgroundColor: theme.palette.background,
  borderRadius: theme.radius.md,
  display: 'flex',
  flexDirection: 'column',
})
