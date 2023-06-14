import { StyleFn } from '@lmpx/styled'

export const styles: StyleFn = ({ theme }) => ({
  height: '100%',
  borderRadius: theme.radius.xs,
  backgroundColor: theme.palette.primary500,
})
