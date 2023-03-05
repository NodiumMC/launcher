import { execute } from '@ipc/tools'
import { appWindow } from '@tauri-apps/api/window'

export async function close() {
  return execute(() => appWindow.close(), false)
}

export async function minimize() {
  return execute(() => appWindow.minimize(), false)
}

export async function toggleMaximize() {
  return execute(() => appWindow.toggleMaximize(), false)
}
