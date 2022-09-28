import styled, { css } from 'styled-components'
import { ellipsis } from 'polished'
import { font } from 'style'
import { shade, ShadeProps } from 'style'

export interface TextProps extends ShadeProps {
  block?: boolean
  center?: boolean
  right?: boolean
  selectable?: boolean
  lineHeight?: string | 'small' | 'medium' | 'high'
  weight?: boolean | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  max?: string | number
  gradient?: boolean
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

const boldStyle = (bold?: boolean | number) => css`
  font-weight: ${bold ? (typeof bold === 'number' ? bold : 'bold') : 'normal'};
`

const maxStyle = (max?: number | string) => css`
  ${ellipsis(max)}
`

const lineHeightStyle = (height?: string | 'small' | 'medium' | 'high') =>
  height
    ? css`
        line-height: ${height === 'small'
          ? '.9rem'
          : height === 'medium'
          ? '1.2rem'
          : height === 'high'
          ? '1.8rem'
          : height};
      `
    : ''

const gradientStyle = css`
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const preStyle = css`
  white-space: pre-wrap;
`

const sizeStyle = (size: number) => css`
  font-size: ${({ theme }) => theme.size(size)};
`

const interactionStyle = css`
  font-family: ${({ theme }) => theme.fonts.interact};
`

export const Text = styled.span<TextProps>`
  display: inline-block;
  color: ${({ theme, color }) => color ?? theme.master.front};
  ${font()}
  ${props => css`
    ${props.block && blockStyle}
    ${props.center && centerStyle}
    ${props.right && rightStyle}
    ${selectableStyle(props.selectable)}
    ${props.lineHeight && lineHeightStyle(props.lineHeight)}
    ${props.weight && boldStyle(props.weight)}
    ${props.max && maxStyle(props.max)}
    ${props.shade && shade(props.shade)}
    ${props.gradient && gradientStyle}
    ${props.font && font(props.font)}
    ${props.pre && preStyle}
    ${props.interaction && interactionStyle}
    ${props.size
      ? sizeStyle(props.size)
      : css`
          font-size: ${({ theme }) => theme.size(10)};
        `}
  `}
`
