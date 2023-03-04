import { StyleFn } from '@theme/tools'

export const styles: StyleFn = ({ theme }) => ({
  width: '100px',
  height: '200px',
  borderRadius: theme.radius.md,
  backgroundColor: theme.palette.background._500,
})
