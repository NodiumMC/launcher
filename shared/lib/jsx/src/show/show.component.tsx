import { FC } from 'react'
import { ShowProps } from './show.interface'

export const Show: FC<ShowProps> = ({ children, when, fallback }) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>{when ? children : fallback}</>
)
