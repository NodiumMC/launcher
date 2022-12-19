import { ReactNode } from 'react'

export interface PopupAction {
  label: string
  action?: (close: () => void) => Awaitable<void>
  close?: boolean
  isPrimary?: boolean
  isDanger?: boolean
}

export interface IPopup {
  idx?: string
  level: 'ok' | 'warn' | 'error' | 'question' | 'info'
  title: string
  description: ReactNode
  actions: PopupAction[]
}
