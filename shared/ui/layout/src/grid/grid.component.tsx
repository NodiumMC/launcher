import { styled } from 'styled'
import { Layout, LayoutProps } from '../layout'

export const Grid = styled(Layout)<LayoutProps>()

Grid.defaultProps = {
  display: 'grid',
}
