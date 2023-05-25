import { StyleFn } from '@lmpx/styled'
import { HEADER_HEIGHT } from '../../constants'

export const shapeStyles: StyleFn = ({ theme }) => ({
  width: HEADER_HEIGHT,
  height: HEADER_HEIGHT,
  borderRadius: theme.radius.md,
})
