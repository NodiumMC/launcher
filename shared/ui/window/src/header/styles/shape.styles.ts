import { StyleFn } from 'styled'
import { HEADER_HEIGHT } from '../constants'

export const shapeStyles: StyleFn = ({ theme }) => ({
  padding: theme.space.md,
  height: HEADER_HEIGHT,
})
