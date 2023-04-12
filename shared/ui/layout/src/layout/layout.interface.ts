import { FlexboxProps, SpaceProps, LayoutProps as StyledSystemLayoutProps, GridProps } from 'styled'

export interface BoxSizingProps {
  boxSizing?: string
  gap?: string
}

export type LayoutProps = FlexboxProps & StyledSystemLayoutProps & SpaceProps & BoxSizingProps & GridProps
