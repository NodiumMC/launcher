import { FC, useMemo } from 'react'
import styled from 'styled-components'

export interface ProgressBarProps {
  total: number
  value: number
  pre: number
}

const Wrapper = styled.div`
  width: 100%;
  height: 16px;
  background-color: ${({ theme }) => theme.master.shade()};
  border-radius: ${({ theme }) => theme.radius(2)};
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
  background-color: ${({ theme }) => theme.accent.primary};
  border-radius: ${({ theme }) => theme.radius(2)};
  position: absolute;
  top: 0;
  left: 0;
  transition: all ${({ theme }) => theme.transition.time};
`

const MaskedProgress = styled(Progress)`
  mask: url("data:image/svg+xml,%3Csvg width='2' height='2' viewBox='0 0 .529 .529' version='1.1' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-rule='evenodd' stroke-width='13.047' fill-opacity='1'%3E%3Cpath d='M0 0h.265v.265H0zM.265.265H.53V.53H.265z'/%3E%3C/g%3E%3C/svg%3E");
  mask-size: 2px 2px;
`

export const ProgressBar: FC<
  ProgressBarProps & ExtraProps.Styled & ExtraProps.As
> = ({ pre, value, total, className }) => {
  const $pre = useMemo(() => pre.map(0, total), [pre, total])
  const $value = useMemo(() => value.map(0, total), [value, total])
  return (
    <Wrapper className={className}>
      <Progress value={$value} />
      <MaskedProgress value={$pre} />
    </Wrapper>
  )
}
