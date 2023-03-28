import { styled, flexbox, layout, space, system } from 'styled'
import { LayoutProps } from './layout.interface'

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
