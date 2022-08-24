import styled from 'styled-components'

export const GlowPane = styled.div`
  position: relative;
  border-radius: 6px;
  background: ${({ theme }) => theme.gradients.primary};
  z-index: 1;

  width: 100px;
  height: 100px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: inherit;
    border-radius: 6px;
    z-index: -1;
    filter: blur(50px);
  }
`