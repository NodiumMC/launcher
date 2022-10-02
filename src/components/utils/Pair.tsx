import styled from 'styled-components'

export interface PairProps {
  gap?: 'small' | 'medium' | 'big'
}

export const Pair = styled.div<PairProps>`
  display: flex;
  align-items: center;
  gap: ${({ gap }) => (gap === 'big' ? '24px' : gap === 'small' ? '6px' : '12px')};
`
