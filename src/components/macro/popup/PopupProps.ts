import { ReactNode } from 'react'

export interface PopupAction {
  label: string
  action: (close: () => void) => void
  isPrimary?: boolean
  isDanger?: boolean
}

export interface IPopup {
  close?: () => void
  level: 'ok' | 'warn' | 'error' | 'question' | 'info'
  title: string
  description: ReactNode
  actions: PopupAction[]
}
