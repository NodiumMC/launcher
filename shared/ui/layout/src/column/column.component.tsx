import { styled } from '@lmpx/styled'
import { Layout, type LayoutProps } from '../layout'

export const Column = styled(Layout)<LayoutProps>()

Column.defaultProps = {
  boxSizing: 'border-box',
  flexDirection: 'column',
  display: 'flex',
  height: '100%',
}
