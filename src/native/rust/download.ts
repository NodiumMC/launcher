import { nanoid } from 'nanoid'
import { invoke } from '@tauri-apps/api'
import { listen } from '@tauri-apps/api/event'
import { Nullable } from 'utils/types'
import EventEmitter from 'eventemitter3'
import { dirname } from '@tauri-apps/api/path'
import { createDir } from '@tauri-apps/api/fs'

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

export const Rdownload = async (
  url: string,
  local: string,
  checksum?: string,
) => {
  const progressId = nanoid()
  const emitter = new EventEmitter<RDownloadEvent>()
  const unlisten = await listen(progressId, ({ payload }) =>
    emitter.emit('progress', payload as RDownloadProgress),
  )
  const complete = <T>(payload?: Nullable<T>, isError = false) => {
    if (isError) emitter.emit('error', `${payload}`)
    else emitter.emit('done', `${payload}`)
    unlisten()
  }
  const dir = await dirname(local)
  await createDir(dir, { recursive: true })
  invoke('download', {
    url,
    to: local,
    expectedChecksum: checksum ?? '',
    progressId,
  }).then(complete, err => complete(err, true))
  return emitter
}
