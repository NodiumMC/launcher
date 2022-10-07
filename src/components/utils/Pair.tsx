import styled from 'styled-components'

export interface PairProps {
  gap?: 'small' | 'medium' | 'big'
}

export const Pair = styled.div<PairProps>`
  display: flex;
  align-items: center;
  gap: ${({ theme, gap }) => (gap === 'big' ? theme.space(3) : gap === 'medium' ? theme.space(2) : theme.space(1))};
`
