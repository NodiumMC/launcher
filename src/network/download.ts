import { Observable } from 'rxjs'
import { Rdownload } from 'native/rust'
import { container } from '@nodium/tsyringe'
import { NetworkCheckerModule } from 'network'
import { cache } from 'storage'

export interface Resource {
  url: string
  local: string
  size?: number
}

export interface BatchProgress {
  total: number
  progress: number
}

export const batchDownload = (resources: Resource[], batchSize = 64) =>
  new Observable<BatchProgress>(subscriber => {
    const nc = container.resolve(NetworkCheckerModule)
    const total = resources.length
    const queue = [...resources]
    let progress = 0
    void (async function loop() {
      while (nc.available && queue.length > 0) {
        const batch = queue.splice(0, batchSize)
        await batch.mapAsync(async r =>
          Rdownload(r.url, r.local, (await cache.getItem(r.local)) ?? undefined).then(
            async hash => {
              progress++
              await cache.setItem(r.local, hash)
              subscriber.next({ total, progress })
            },
            () => queue.push(r),
          ),
        )
      }
      if (queue.length === 0) {
        subscriber.complete()
        return
      }
      nc.events.once('available', loop)
    })()
  })
