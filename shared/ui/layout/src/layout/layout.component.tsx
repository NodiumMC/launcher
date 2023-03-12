import styled from '@emotion/styled'
import { flexbox, layout, space, system } from 'styled-system'
import { LayoutProps } from '@ui/layout'

export const Layout = styled.div<LayoutProps>(
  system({
    boxSizing: true,
  }),
  layout,
  space,
  flexbox,
)

Layout.defaultProps = {
  display: 'flex',
  boxSizing: 'border-box',
}
