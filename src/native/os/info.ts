import { arch as tauriArch, version, platform as tauriPlatform } from '@tauri-apps/api/os'

export const arch = await tauriArch()
export const is64 = arch.includes('x86_64')
export const is32 = arch.includes('32') || arch.includes('86')
export const release = await version()
export const platform = await tauriPlatform()
export const isUnix = platform !== 'win32'
