import type { FontFamily, FontScale } from '@theme/types'

export interface TypographyProps {
  heading?: FontScale
  font?: keyof FontFamily
  weight?: string | number
}
