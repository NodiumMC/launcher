import { ReactNode } from 'react'

export interface PopupAction {
  label: string
  action: () => Awaitable<void>
  isPrimary?: boolean
  isDanger?: boolean
}

export interface IPopup {
  level: 'ok' | 'warn' | 'error' | 'question' | 'info'
  title: string
  description: ReactNode
  actions: PopupAction[]
}
