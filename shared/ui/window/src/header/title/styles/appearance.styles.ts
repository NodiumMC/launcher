import { StyleFn } from '@style/tools'

export const appearanceStyles: StyleFn = ({ theme }) => ({
  color: theme.palette.foreground._200,
  fontFamily: theme.font.main,
  fontSize: theme.size.sm,
  fontWeight: '500',
  fontStretch: '120%',
  fontVariationSettings: '"wght" 600, "wdth" 120',
})
