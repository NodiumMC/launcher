import { execute } from '@ipc/tools'
import { appWindow } from '@tauri-apps/api/window'

export async function close() {
  return execute(() => appWindow.close())
}

export async function minimize() {
  return execute(() => appWindow.minimize())
}

export async function toggleMaximize() {
  return execute(() => appWindow.toggleMaximize())
}
