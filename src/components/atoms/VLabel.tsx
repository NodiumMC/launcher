import styled from 'styled-components'

export const VLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space()};
  span {
    font-size: ${({ theme }) => theme.size(10)} !important;
  }
`
