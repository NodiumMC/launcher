import { Show } from '@jsx/helpers'
import type { FC, PropsWithChildren } from 'react'
import { isApplication } from './detect'

export const WebsiteRenderMode: FC<PropsWithChildren> = ({ children }) => (
  <Show when={!isApplication()}>
    {children}
  </Show>
)

export const ApplicationRenderMode: FC<PropsWithChildren> = ({ children }) => (
  <Show when={isApplication()}>
    {children}
  </Show>
)
