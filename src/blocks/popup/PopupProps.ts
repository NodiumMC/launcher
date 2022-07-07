import { FC } from 'react'

export interface PopupProps {
  close?: () => void
  render?: FC<PopupProps>
}
