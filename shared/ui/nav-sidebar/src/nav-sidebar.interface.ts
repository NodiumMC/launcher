import { ReactNode } from 'react'

export interface Item {
  path: string
  icon: ReactNode
}

export interface NavSidebarProps {
  topItems: Item[]
  bottomItems: Item[]
}
