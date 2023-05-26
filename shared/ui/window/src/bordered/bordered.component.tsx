import { grid, styled } from '@lmpx/styled'
import { styles } from './bordered.styles'
import { BorderedProps } from './bordered.interface'
import { Layout } from '@ui/layout'

export const Bordered = styled(Layout)<BorderedProps>(styles, grid)
