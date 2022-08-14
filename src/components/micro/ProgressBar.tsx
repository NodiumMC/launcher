import { FC, useMemo } from 'react'
import styled from 'styled-components'
import { map } from 'utils/map'
import { As, Styled } from 'utils/UtilityProps'

export interface ProgressBarProps {
  total: number
  value: number
  pre: number
}

const Wrapper = styled.div`
  width: 100%;
  height: 16px;
  background-color: ${({ theme }) => theme.colors.backShade};
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  transition: all ${({ theme }) => theme.transition.time};
`

interface ProgressProps {
  value: number
}

const Progress = styled.div<ProgressProps>`
  width: ${({ value }) => `${value}%`};
  height: 100%;
  background-color: ${({ theme }) => theme.colors.accent};
  border-radius: 5px;
  position: absolute;
  top: 0;
  left: 0;
  transition: all ${({ theme }) => theme.transition.time};
`

const MaskedProgress = styled(Progress)`
  mask: url("data:image/svg+xml,%3Csvg width='2' height='2' viewBox='0 0 .529 .529' version='1.1' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-rule='evenodd' stroke-width='13.047' fill-opacity='1'%3E%3Cpath d='M0 0h.265v.265H0zM.265.265H.53V.53H.265z'/%3E%3C/g%3E%3C/svg%3E");
  mask-size: 2px 2px;
`

export const ProgressBar: FC<ProgressBarProps & Styled & As> = ({
  pre,
  value,
  total,
  className,
}) => {
  const $pre = useMemo(() => map(pre, 0, total, 0, 100), [pre, total])
  const $value = useMemo(() => map(value, 0, total, 0, 100), [value, total])
  return (
    <Wrapper className={className}>
      <Progress value={$value} />
      <MaskedProgress value={$pre} />
    </Wrapper>
  )
}
