import { Observable } from 'rxjs'
import { nanoid } from 'nanoid'
import { listen } from '@tauri-apps/api/event'

import { invoke } from '@tauri-apps/api'

export interface RUnzipProgress {
  total: number
  progress: number
}

export const Runzip = (from: string, to: string, deleteAfter?: boolean) =>
  new Observable<RUnzipProgress>(subscriber => {
    ;(async () => {
      const progressId = nanoid()
      const unlisten = await listen(progressId, ({ payload }) => subscriber.next(payload as RUnzipProgress))
      const complete = <T>(payload?: Nullable<T>) => {
        if (payload instanceof Error) subscriber.error(payload)
        else subscriber.complete()
        unlisten()
      }
      invoke('unzip', {
        from,
        to,
        delete: deleteAfter ?? true,
        progressId,
      }).then(complete, complete)
    })()
  })
