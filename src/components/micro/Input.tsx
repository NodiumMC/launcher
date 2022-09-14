import styled, { css } from 'styled-components'
import { transition } from 'style'

export interface InputProps {
  center?: boolean
}

const centerStyle = css`
  text-align: center;
`

export const Input = styled.input<InputProps>`
  border: 2px solid ${({ theme }) => theme.palette.back.shades[0]};
  border-radius: ${({ theme }) => theme.shape.radius[0]};
  background-color: ${({ theme }) => theme.palette.back.default};
  height: 38px;
  margin: 0;
  padding: 0 10px;

  ${props => css`
    ${props.center && centerStyle}
  `}

  ${transition()}
  &:focus {
    background-color: ${({ theme }) => theme.palette.back.tints[0]};
    border-color: ${({ theme }) => theme.palette.accent.default};
  }
`
