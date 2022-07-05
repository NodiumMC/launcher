import styled from 'styled-components'

export const Screen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.back};
  transition: all ${({ theme }) => theme.transition.time};
`
