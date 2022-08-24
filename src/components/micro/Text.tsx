import styled from 'styled-components'

export interface TextProps {
  center?: boolean
  shade?: boolean
  ns?: boolean
  bold?: boolean
  pre?: boolean
}

export const Text = styled.span<TextProps>`
  text-align: ${({ center }) => (center ? 'center' : 'start')};
  color: ${({ shade, theme }) => (shade ? theme.palette.grayscale[2] : 'inherit')};
  user-select: ${({ ns }) => (ns ? 'none' : 'auto')};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  white-space: ${({ pre }) => (pre ? 'pre-wrap' : 'normal')};
`
