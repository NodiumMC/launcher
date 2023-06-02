import { gridArea, type GridAreaProps, styled } from '@lmpx/styled'
import { styles } from './view.styles'

export const View = styled.div<GridAreaProps>(styles, gridArea)

View.defaultProps = {
  gridArea: 'view'
}
