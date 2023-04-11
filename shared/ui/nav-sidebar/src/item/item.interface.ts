import { ReactNode } from 'react'

export interface ItemProps {
  icon: ReactNode
  isActive?: boolean
  onClick?: () => void
  blurry?: boolean
}
