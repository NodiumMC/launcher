import { Observable } from 'rxjs'
import { nanoid } from 'nanoid'
import { invoke } from '@tauri-apps/api'
import { listen } from '@tauri-apps/api/event'
import { Nullable } from '../../../utils/types'

export interface RDownloadProgress {
  total: number
  transferred: number
}

export const Rdownload = (url: string, local: string, checksum?: string) =>
  new Observable<RDownloadProgress>(subscriber => {
    ;(async () => {
      const progressId = nanoid()
      const unlisten = await listen(progressId, ({ payload }) => subscriber.next(payload as RDownloadProgress))
      const complete = <T>(payload?: Nullable<T>) => {
        if (payload instanceof Error) subscriber.error(payload)
        else subscriber.complete()
        unlisten()
        console.log(payload)
      }
      invoke('download', {
        url,
        to: local,
        expectedChecksum: checksum ?? '',
        progressId,
      }).then(complete, complete)
    })()
  })
