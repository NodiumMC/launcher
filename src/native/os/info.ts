import {
  arch as tauriArch,
  version,
  platform as tauriPlatform,
} from '@tauri-apps/api/os'

export const arch = async () =>
  tauriArch().then(a => a.replace('x86_64', 'x64'))
export const is64 = async () => arch().then(a => a.includes('64'))
export const is32 = async () =>
  arch().then(a => a.includes('32') || a.includes('86'))
export const release = async () => version()
export const platform = async () => tauriPlatform()
