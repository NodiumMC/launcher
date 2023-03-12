import { FC } from 'react'
import { ProgressBar } from '@ui/progress-bar'
import { Column } from '@ui/layout'

export const HomePage: FC = () => (
  <Column p={16}>
    <ProgressBar value={68} />
  </Column>
)
