import styled from 'styled-components'

interface SquareGroupProps {
  disabled?: boolean
}

export const SquareGroup = styled.div<SquareGroupProps>`
  display: inline-flex;
  height: 38px;
  background-color: ${({ theme }) => theme.master.edge(0.1)};
  border-radius: ${({ theme }) => theme.radius()};
  overflow: hidden;
  filter: ${({ disabled }) => (disabled ? 'grayscale(1) brightness(0.5)' : 'none')};
  position: relative;
`
