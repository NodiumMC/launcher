import { LayoutProps, styled } from '@lmpx/styled'
import { Layout } from '../layout'

export const Column = styled(Layout)<LayoutProps>()

Column.defaultProps = {
  boxSizing: 'border-box',
  flexDirection: 'column',
  display: 'flex',
  height: '100%',
}
