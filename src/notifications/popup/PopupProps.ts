import { ReactNode } from 'react'
import { Awaitable } from 'utils/types'

export interface PopupAction {
  label: string
  action: (close: () => void) => Awaitable<void>
  isPrimary?: boolean
  isDanger?: boolean
}

export interface IPopup {
  close: () => void
  level: 'ok' | 'warn' | 'error' | 'question' | 'info'
  title: string
  description: ReactNode
  actions: PopupAction[]
}
