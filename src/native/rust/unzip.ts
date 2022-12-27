import { Observable } from 'rxjs'
import { nanoid } from 'nanoid'
import { listen } from '@tauri-apps/api/event'

import { invoke } from '@tauri-apps/api'

export interface RUnzipProgress {
  total: number
  progress: number
}

export const Runzip = (from: string, to: string, deleteAfter = true) =>
  new Observable<RUnzipProgress>(subscriber => {
    ;(async () => {
      const progressId = nanoid()
      const unlisten = await listen(progressId, ({ payload }) => subscriber.next(payload as RUnzipProgress))
      invoke('unzip', {
        from,
        to,
        delete: deleteAfter,
        progressId,
      }).then(
        () => (subscriber.complete(), unlisten()),
        error => subscriber.error(error),
      )
    })()
  })
