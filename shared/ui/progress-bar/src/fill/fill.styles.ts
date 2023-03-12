import { StyleFn } from '@styled/tools'

export const styles: StyleFn = ({ theme }) => ({
  height: '100%',
  borderRadius: theme.radius.xs,
  backgroundColor: theme.palette.primary._500,
})
