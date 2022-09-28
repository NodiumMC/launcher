import styled, { css } from 'styled-components'
import { transition } from 'style'

export interface InputProps {
  center?: boolean
}

const centerStyle = css`
  text-align: center;
`

export const Input = styled.input<InputProps>`
  border: 2px solid ${({ theme }) => theme.master.shade()};
  border-radius: ${({ theme }) => theme.radius()};
  background-color: ${({ theme }) => theme.master.back};
  height: 38px;
  margin: 0;
  padding: 0 10px;

  ${props => css`
    ${props.center && centerStyle}
  `}

  ${transition()}
  &:focus {
    background-color: ${({ theme }) => theme.master.shade()};
    border-color: ${({ theme }) => theme.accent.primary};
  }
`
