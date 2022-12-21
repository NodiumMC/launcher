import styled, { css } from 'styled-components'
import { transition } from 'style'
import { FC } from 'react'

export interface InputProps {
  center?: boolean
}

const centerStyle = css`
  text-align: center;
`

const Placeholder = styled.div`
  position: absolute;
  top: 50%;
  padding: 0 ${({ theme }) => theme.space()};
  left: ${({ theme }) => theme.space()};
  user-select: none;
  z-index: 1;
  translate: 0 -50%;
  ${transition('all')}
  color: ${({ theme }) => theme.master.shade(0.3)};
  pointer-events: none;
  border-radius: ${({ theme }) => theme.radius()};
`

export const StyledInput = styled.input<InputProps>`
  border: 2px solid
    ${({ theme, invalid, valid }) => (valid ? theme.palette.green : invalid ? theme.palette.red : theme.master.shade())};
  border-radius: ${({ theme }) => theme.radius()};
  background-color: ${({ theme }) => theme.master.edge()};
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0 ${({ theme }) => theme.space()};

  ${props => css`
    ${props.center && centerStyle}
  `}

  ${transition()}
  &:focus:not([readonly]) {
    background-color: ${({ theme, invalid, valid }) => !valid && !invalid && theme.master.edge(0.1)};
    border-color: ${({ theme, invalid, valid }) => !valid && !invalid && theme.accent.primary};
  }

  &::placeholder {
    opacity: 0;
  }

  &[disabled] {
    background-color: ${({ theme }) => theme.master.shade()};
    cursor: not-allowed;
  }

  &:not(:placeholder-shown:empty) ~ ${Placeholder}, &:focus ~ ${Placeholder} {
    top: 0;
    background-color: ${({ theme, invalid, valid }) =>
      valid ? theme.palette.green : invalid ? theme.palette.red : theme.master.shade()};
    font-size: ${({ theme }) => theme.size(8)};
    color: ${({ theme, valid, invalid }) => (valid || invalid ? theme.master.back : theme.master.front)};
  }

  &:focus ~ ${Placeholder} {
    background-color: ${({ theme, valid, invalid }) => !valid && !invalid && theme.accent.primary} !important;
    color: ${({ theme, valid, invalid }) => !valid && !invalid && theme.master.back} !important;
  }
`

const Container = styled.div`
  width: 100%;
  height: 38px;
  position: relative;
`

export interface InputProps {
  disabled?: boolean
  invalid?: boolean
  valid?: boolean
}

export const Input: FC<JSX.IntrinsicElements['input'] & InputProps> = args => (
  <Container>
    <StyledInput {...(args as object)} />
    <Placeholder>{args.placeholder}</Placeholder>
  </Container>
)