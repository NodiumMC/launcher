import { Observable } from 'rxjs'
import { BlakeMap } from 'core'
import { Rdownload } from 'native/rust'
import { container } from 'tsyringe'
import { NetworkChecker } from 'network'

export interface Resource {
  url: string
  local: string
  size?: number
}

export interface BatchProgress {
  total: number
  progress: number
}

export const batchDownload = (resources: Resource[], blake?: BlakeMap, batchSize = 64) =>
  new Observable<BatchProgress>(subscriber => {
    const nc = container.resolve(NetworkChecker)
    const total = resources.length
    const queue = [...resources].sort((a, b) => a.size ?? 0 - (b.size ?? 0))
    let progress = 0
    void (async function loop() {
      while (nc.available && queue.length > 0) {
        const batch = queue.slice(0, batchSize)
        await batch.mapAsync((r, i) =>
          Rdownload(r.url, r.local, blake?.[r.local]).then(
            hash => {
              queue.splice(i, 1)
              progress++
              if (blake) blake[r.local] = hash
              subscriber.next({ total, progress })
            },
            error => console.log(error),
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
