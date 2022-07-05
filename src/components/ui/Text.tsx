import styled from 'styled-components'

export interface TextProps {
  center?: boolean
  shade?: boolean
  ns?: boolean
}

export const Text = styled.span<TextProps>`
  text-align: ${({ center }) => center ? 'center' : 'start'};
  color: ${({ shade, theme }) => shade ? theme.colors.mid : 'inherit'};
  user-select: ${({ ns }) => ns ? 'none' : 'auto'};
`
