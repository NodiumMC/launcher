import { type StyleFn } from '@lmpx/styled'
import { TypographyProps } from '../typography.interface'

export const appearanceStyles: StyleFn<TypographyProps> = ({ font, theme }) => ({
  fontFamily: theme.font[font ?? 'main']
})
