import { styled, flexbox, layout, space, system, grid } from 'styled'
import { LayoutProps } from './layout.interface'

export const Layout = styled.div<LayoutProps>(
  system({
    boxSizing: true,
    gap: true,
  }),
  layout,
  space,
  flexbox,
  grid,
)

Layout.defaultProps = {
  display: 'flex',
  boxSizing: 'border-box',
}
