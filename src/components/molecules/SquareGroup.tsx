import styled from 'styled-components'

interface SquareGroupProps {
  disabled?: boolean
  vertical?: boolean
}

export const SquareGroup = styled.div<SquareGroupProps>`
  display: inline-flex;
  flex-direction: ${({ vertical }) => (vertical ? 'column' : 'row')};
  ${({ vertical }) => (vertical ? 'width: 38px' : 'height: 38px')};
  background-color: ${({ theme }) => theme.master.shade(0.1)};
  border-radius: ${({ theme }) => theme.radius()};
  overflow: hidden;
  filter: ${({ disabled }) => (disabled ? 'grayscale(1) brightness(0.5)' : 'none')};
  position: relative;
`
