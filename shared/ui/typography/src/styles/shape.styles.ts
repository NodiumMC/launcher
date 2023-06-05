import { combine, ifProp, type StyleFn } from '@lmpx/styled'
import type { TypographyProps } from '../typography.interface'

const heading: StyleFn<TypographyProps> = ({ heading, theme }) => ({
  fontSize: theme.size[heading!],
  lineHeight: theme.line[heading!]
})

const weight: StyleFn<TypographyProps> = ({ weight }) => ({
  fontWeight: weight!,
})

export const shapeStyles = combine(
  ifProp<TypographyProps>('heading', heading),
  ifProp<TypographyProps>('weight', weight)
)
