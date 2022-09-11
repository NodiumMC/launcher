import {
  arch as tauriArch,
  version,
  platform as tauriPlatform,
} from '@tauri-apps/api/os'

export const arch = await tauriArch().then(a => a.replace('x86_64', 'x64'))
export const is64 = arch.includes('64')
export const is32 = arch.includes('32') || arch.includes('86')
export const release = await version()
export const platform = await tauriPlatform()
export const isUnix = platform !== 'win32'
