import { tauri } from '@tauri-apps/api'
import { listen } from '@tauri-apps/api/event'
import { nanoid } from 'nanoid'
import { Observable } from 'rxjs'

export interface DownloadableResource {
  url: string
  local: string
  sha1?: string
  size?: number
}

export interface DownloadProgress {
  total: number
  progress: number
  error?: string
  done?: boolean
}

export const r_download = (
  resource: DownloadableResource,
): Observable<DownloadProgress> =>
  new Observable<DownloadProgress>(observer => {
    ;(async () => {
      const event = nanoid()
      tauri.invoke('download', { resource })
      const unlist = await listen(
        event,
        ({ payload }: { payload: DownloadProgress }) => {
          if (payload.error) {
            unlist()
            observer.error(payload.error)
          }
          if (payload.done) {
            unlist()
            observer.complete()
          }
          observer.next(payload)
        },
      )
    })()
  })
