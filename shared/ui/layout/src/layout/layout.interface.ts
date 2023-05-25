import { FlexboxProps, SpaceProps, LayoutProps as StyledSystemLayoutProps, GridProps } from '@lmpx/styled'

export interface BoxSizingProps {
  boxSizing?: string
  gap?: string
}

export type LayoutProps = FlexboxProps & StyledSystemLayoutProps & SpaceProps & BoxSizingProps & GridProps
