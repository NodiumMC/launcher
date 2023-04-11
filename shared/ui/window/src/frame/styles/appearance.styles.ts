import { StyleFn } from 'styled'
import { shade, readableColor } from 'polished'

export const appearanceStyles: StyleFn = ({ theme }) => ({
  backgroundColor: readableColor(
    theme.palette.background,
    shade(0.05, theme.palette.background),
    shade(0.3, theme.palette.background),
    false,
  ),
})
