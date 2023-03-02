import { PropsWithChildren, ReactNode } from 'react'

export interface ShowProps extends PropsWithChildren {
  when: any
  fallback?: ReactNode
}
