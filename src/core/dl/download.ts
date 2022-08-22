import { Rdownload, RDownloadProgress } from 'native/rust'
import { BlakeMap } from 'core'
import EventEmitter from 'eventemitter3'

export interface DownloadableResource {
  url: string
  local: string
  hash?: string
  size: number
  after?: (resource: DownloadableResource) => PromiseLike<void> | void
}

export const download = async (resource: DownloadableResource) =>
  Rdownload(resource.url, resource.local, resource.hash)

export interface BatchDownloadEvent {
  progress: (progress: RDownloadProgress) => void
  unit: (path: string, hash: string) => void
  done: (map: BlakeMap) => void
  error: (e: Error) => void
}

export const batchDownload = async (resources: DownloadableResource[]) => {
  const totalSize = resources.reduce((acc, cur) => acc + cur.size, 0)
  const emitter = new EventEmitter<BatchDownloadEvent>()
  let progress = 0
  const blakeMap: BlakeMap = {}
  const remap = async (rs: DownloadableResource[], _retries = 0) => {
    if (_retries > 10) {
      emitter.emit('error', new Error('Too many retries'))
      return
    }
    const failist: DownloadableResource[] = []
    await rs
      .mapAsync(
        r =>
          new Promise<void>(async rs => {
            const dp = await download(r)
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
              blakeMap[r.local] = hash
              emitter.emit('unit', r.local, hash)
              r.after?.(r)
              rs()
            })
            dp.on('error', () => {
              failist.push(r)
              progress -= transferred
              rs()
            })
          }),
      )
      .then(() => (failist.length > 0 ? remap(failist, _retries + 1) : void 0))
      .then(() => emitter.emit('done', blakeMap))
  }
  remap(resources)
  return emitter
}
