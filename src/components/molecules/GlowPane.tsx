import styled from 'styled-components'

export const GlowPane = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.radius(2)};
  background: ${({ theme }) => theme.accent.primary};
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
    border-radius: ${({ theme }) => theme.radius(2)};
    z-index: -1;
    filter: blur(50px);
  }
`
