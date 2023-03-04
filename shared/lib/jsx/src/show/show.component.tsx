import { FC } from 'react'
import { ShowProps } from './show.interface'

export const Show: FC<ShowProps> = ({ children, when, fallback }) => {
  return <>{when ? children : fallback}</>
}
