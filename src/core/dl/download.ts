import { Rdownload, RDownloadProgress } from 'native/rust'
import EventEmitter from 'eventemitter3'

export interface DownloadableResource {
  url: string
  local: string
  hash?: string
  size: number
  after?: (resource: DownloadableResource) => PromiseLike<void> | void
}

export const download = async (resource: DownloadableResource) => Rdownload(resource.url, resource.local, resource.hash)

export interface BatchDownloadEvent {
  progress: (progress: RDownloadProgress) => void
  unit: (path: string, hash: string) => void
  done: () => void
  error: (e: Error) => void
}

export const batchDownload = async (resources: DownloadableResource[], signal: AbortSignal, batchSize = 32) => {
  const totalSize = resources.reduce((acc, cur) => acc + cur.size, 0)
  const emitter = new EventEmitter<BatchDownloadEvent>()
  let progress = 0
  const remap = async (rs: DownloadableResource[], _retries = 0) => {
    if (signal?.aborted) {
      emitter.emit('error', new Error('aborted'))
      return
    }
    if (_retries > 50) {
      emitter.emit('error', new Error('Too many retries'))
      return
    }
    const failist: DownloadableResource[] = []
    for (const r of rs.chunk(batchSize)) {
      await r.mapAsync(item =>
        new Promise<void>(async resolve => {
          if (signal?.aborted) {
            emitter.emit('error', new Error('aborted'))
            return
          }
          const dp = await download(item)
          let transferred = 0
          dp.on('progress', p => {
            progress += p.chunk
            transferred += p.chunk
            emitter.emit('progress', {
              total: totalSize,
              transferred: progress,
              chunk: p.chunk,
            })
          })
          dp.on('done', hash => {
            emitter.emit('unit', item.local, hash)
            item.after?.(item)
            resolve()
          })
          dp.on('error', () => {
            failist.push(item)
            progress -= transferred
            resolve()
          })
        }).catch(err => emitter.emit('error', err)),
      )
    }
    if (failist.length > 0) await remap(failist, _retries + 1)
  }
  remap(resources).then(() => {
    emitter.emit('done')
  })
  return emitter
}
