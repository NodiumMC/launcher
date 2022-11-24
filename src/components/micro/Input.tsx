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
  background-color: ${({ theme }) => theme.master.edge()};
  height: 38px;
  margin: 0;
  padding: 0 10px;

  ${props => css`
    ${props.center && centerStyle}
  `}

  ${transition()}
  &:focus:not([readonly]) {
    background-color: ${({ theme }) => theme.master.edge(0.1)};
    border-color: ${({ theme }) => theme.accent.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.master.shade(0.3)};
  }

  &[disabled] {
    background-color: ${({ theme }) => theme.master.shade()};
    cursor: not-allowed;
  }
`
