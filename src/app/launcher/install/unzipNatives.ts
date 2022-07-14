import { readDir } from '@tauri-apps/api/fs'
import { RUnzipProgress } from '../../bridge/R/unzip'
import EventEmitter from 'eventemitter3'
import { R } from '../../bridge/R'

export interface UnzipNativesEvent {
  progress: (progress: RUnzipProgress) => void
  done: () => void
  error: (e: Error) => void
}

export const unzipNatives = async (dir: string) => {
  const files = await readDir(dir).then(v => v.filter(v => v.name?.endsWith('.jar')))
  const emitter = new EventEmitter<UnzipNativesEvent>()
  let total = 0
  let progress = 0
  if(files.length === 0) emitter.emit('done')
  Promise.all(files.map(file => new Promise<void>(async rs => {
    let totalized = false
    R.unzip(file.path, dir).subscribe({
      next: (unp: RUnzipProgress) => {
        if (!totalized) total += unp.total
        totalized = true
        emitter.emit('progress', {
          total,
          progress: ++progress,
        })
      },
      error: e => emitter.emit('error', e),
      complete: rs,
    })
  })))
  return emitter
}
