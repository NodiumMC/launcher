import { invoke } from '@tauri-apps/api'
import { dirname } from 'native/path'
import { prepare } from 'native/filesystem'

export interface RDownloadProgress {
  total: number
  chunk: number
  transferred: number
}

export interface RDownloadEvent {
  progress: (payload: RDownloadProgress) => void
  done: (hash: string) => void
  error: (error: string) => void
}

export const Rdownload = async (url: string, local: string, hash?: string) => {
  await prepare(dirname(local))
  return invoke('download', {
    item: {
      url,
      local,
      hash,
    },
  })
}
