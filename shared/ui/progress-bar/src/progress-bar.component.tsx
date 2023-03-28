import { FC } from 'react'
import { map } from '@lib/math'
import { Fill } from './fill'
import { Wrapper } from './wrapper'
import { ProgressBarProps } from './progress-bar.interface'

export const ProgressBar: FC<ProgressBarProps> = ({ min = 0, max = 100, value }) => {
  const normalized = map(value, min, max, 0, 100)

  return (
    <Wrapper>
      <Fill animate={{ width: `${normalized}%` }} />
    </Wrapper>
  )
}
