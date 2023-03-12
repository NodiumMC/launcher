import {
  BackgroundProps,
  BorderProps,
  BoxShadowProps,
  ColorProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
} from 'styled-system'

export interface BoxSystemProps {
  boxSizing?: string
}

export type BoxProps = FlexboxProps &
  LayoutProps &
  SpaceProps &
  BoxSystemProps &
  PositionProps &
  ColorProps &
  BorderProps &
  BoxShadowProps &
  BackgroundProps
