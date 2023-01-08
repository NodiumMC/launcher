import { invoke } from '@tauri-apps/api'
import { Observable } from 'rxjs'
import { nanoid } from 'nanoid'
import { emit, listen } from '@tauri-apps/api/event'
import { prepare } from 'native/filesystem'
import { dirname } from 'native/path'

export const Rdownload = async (url: string, local: string, hash?: string): Promise<string> => {
  return invoke('download', {
    item: {
      url,
      local,
      hash,
    },
  })
}

export interface RdownloadLTProgress {
  total: number
  transferred: number
  chunk: number
}

export const RdownloadLT = (url: string, local: string, hash?: string) =>
  new Observable<RdownloadLTProgress>(subscriber => {
    const pid = nanoid(8)
    const aid = nanoid(8)
    void (async () => {
      const unlisten = await listen<RdownloadLTProgress>(pid, event => subscriber.next(event.payload))
      await invoke('download_longtime', { pid, aid, item: { url, local, hash } })
        .catch(subscriber.error.bind(subscriber))
        .finally(() => unlisten())
        .then(() => subscriber.complete())
    })().catch(subscriber.error.bind(subscriber))
    return () => emit(aid)
  })
