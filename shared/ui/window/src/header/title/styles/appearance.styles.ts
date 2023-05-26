import { StyleFn } from '@lmpx/styled'

export const appearanceStyles: StyleFn = ({ theme }) => ({
  color: theme.palette.gray._200,
  fontFamily: theme.font.main,
  fontSize: theme.size.sm,
  fontWeight: '400',
})
