import { StyleFn } from '@style/tools'
import { HEADER_HEIGHT } from '@ui/window/src/header/constants'

export const shapeStyles: StyleFn = ({ theme }) => ({
  width: HEADER_HEIGHT,
  height: HEADER_HEIGHT,
  borderRadius: theme.radius.md,
})
