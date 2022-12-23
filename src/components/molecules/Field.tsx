import { forwardRef } from 'react'
import { FieldError } from 'react-hook-form'
import { Input } from 'components/atoms/Input'
import styled from 'styled-components'

export interface FieldProps {
  error?: FieldError
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1px;
`

const Error = styled.span`
  margin-left: 1px;
  color: ${({ theme }) => theme.palette.red};
  font-size: ${({ theme }) => theme.size(8)};
  font-weight: 100;
  height: 14px;
`

export const Field = forwardRef<HTMLInputElement, JSX.IntrinsicElements['input'] & FieldProps>(
  ({ error, ...props }, ref) => (
    <Wrapper>
      <Input {...props} invalid={!!error} ref={ref} />
      <Error>{error?.message}</Error>
    </Wrapper>
  ),
)
