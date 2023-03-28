import { FlexboxProps, SpaceProps, LayoutProps as StyledSystemLayoutProps } from 'styled'

export interface BoxSizingProps {
  boxSizing?: string
}

export type LayoutProps = FlexboxProps & StyledSystemLayoutProps & SpaceProps & BoxSizingProps
