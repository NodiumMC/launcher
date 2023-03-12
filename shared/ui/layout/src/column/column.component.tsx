import { Layout } from '../layout'
import { LayoutProps } from 'styled-system'
import styled from '@emotion/styled'

export const Column = styled(Layout)<LayoutProps>()

Column.defaultProps = {
  boxSizing: 'border-box',
  flexDirection: 'column',
  display: 'flex',
  height: '100%',
}
