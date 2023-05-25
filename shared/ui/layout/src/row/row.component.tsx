import { LayoutProps, styled } from '@lmpx/styled'
import { Layout } from '../layout'

export const Row = styled(Layout)<LayoutProps>()

Row.defaultProps = {
  boxSizing: 'border-box',
  flexDirection: 'row',
  display: 'flex',
  width: '100%',
}
