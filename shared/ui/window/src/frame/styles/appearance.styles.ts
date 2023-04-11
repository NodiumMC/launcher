import { StyleFn } from 'styled'
import { shade } from 'polished'

export const appearanceStyles: StyleFn = ({ theme }) => ({
  backgroundColor: shade(0.3, theme.palette.background),
})
