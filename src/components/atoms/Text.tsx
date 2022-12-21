import styled, { css } from 'styled-components'
import { ellipsis } from 'polished'
import { font } from 'style'
import { shade, ShadeProps } from 'style'
import { normalizeFontWeight } from 'utils'
import { Styles } from 'polished/lib/types/style'

export interface TextProps extends ShadeProps {
  block?: boolean
  center?: boolean
  right?: boolean
  selectable?: boolean
  lineHeight?: string | 'small' | 'medium' | 'high'
  weight?: FontWeightLike
  max?: string | number
  gradient?: Styles | string | boolean
  font?: string
  pre?: boolean
  size?: number
  interaction?: boolean
}

const blockStyle = css`
  display: block;
`

const centerStyle = css`
  text-align: center;
`

const rightStyle = css`
  text-align: right;
`

const selectableStyle = (selectable?: boolean) => css`
  user-select: ${selectable ? 'auto' : 'none'};
`

const boldStyle = (weight?: FontWeightLike) => css`
  font-weight: ${normalizeFontWeight(weight ?? 'regular')};
`

const maxStyle = (max?: number | string) => css`
  ${ellipsis(max)}
`

const lineHeightStyle = (height?: string | 'small' | 'medium' | 'high') =>
  height
    ? css`
        ${height === 'small' ? '.9rem' : height === 'medium' ? '1.2rem' : height === 'high' ? '1.8rem' : height};
      `
    : undefined

const gradientStyle = (gradient?: string | Styles | boolean) => css`
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background: ${gradient as any};
`

const preStyle = css`
  white-space: pre-wrap;
`

const interactionStyle = css`
  font-family: ${({ theme }) => theme.fonts.interact};
`

export const Text = styled.span.attrs<TextProps>(({ theme, ...props }) => ({
  style: {
    color: props.color,
    fontSize: theme?.size?.(props.size),
    lineHeight: lineHeightStyle(props.lineHeight),
  },
}))<TextProps>`
  display: inline-block;
  color: inherit;
  font-size: inherit;
  ${props => css`
    ${props.block && blockStyle}
    ${props.center && centerStyle}
    ${props.right && rightStyle}
    ${selectableStyle(props.selectable)}
    ${props.weight && boldStyle(props.weight)}
    ${props.max && maxStyle(props.max)}
    ${props.shade && shade(props.shade)}
    ${props.gradient && gradientStyle(props.gradient)}
    ${props.font && font(props.font)}
    ${props.pre && preStyle}
    ${props.interaction && interactionStyle}
  `}
`