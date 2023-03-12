import styled from '@emotion/styled'
import { BoxProps } from './box.interface'
import { background, border, boxShadow, color, flexbox, layout, position, space, system } from 'styled-system'

export const Box = styled.div<BoxProps>(
  system({
    boxSizing: true,
    cursor: true,
  }),
  layout,
  space,
  flexbox,
  color,
  position,
  boxShadow,
  border,
  background,
)

Box.defaultProps = {
  display: 'flex',
  boxSizing: 'border-box',
}
