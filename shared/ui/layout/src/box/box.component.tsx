import { styled, background, border, boxShadow, color, flexbox, layout, position, space, system, grid } from '@lmpx/styled'
import { BoxProps } from './box.interface'

export const Box = styled.div<BoxProps>(
  system({
    boxSizing: true,
    cursor: true,
    gap: true,
  }),
  layout,
  space,
  flexbox,
  color,
  position,
  boxShadow,
  border,
  background,
  grid,
)

Box.defaultProps = {
  display: 'flex',
  boxSizing: 'border-box',
}
