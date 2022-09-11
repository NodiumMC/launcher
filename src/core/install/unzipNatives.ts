import { readDir } from '@tauri-apps/api/fs'
import { Runzip, RUnzipProgress } from 'native/rust'
import EventEmitter from 'eventemitter3'

export interface UnzipNativesEvent {
  progress: (progress: RUnzipProgress) => void
  done: () => void
  error: (e: Error) => void
}

export const unzipNatives = async (dir: string) => {
  const files = await readDir(dir).then(v =>
    v.filter(v => v.name?.endsWith('.jar')),
  )
  const emitter = new EventEmitter<UnzipNativesEvent>()
  let total = 0
  let progress = 0
  if (files.length === 0) {
    setTimeout(() => emitter.emit('done'), 0)
    return emitter
  }
  files.mapAsync(file =>
    new Promise<void>(rs => {
      let totalized = false
      Runzip(file.path, dir).subscribe({
        next: (unp: RUnzipProgress) => {
          if (!totalized) total += unp.total
          totalized = true
          emitter.emit('progress', {
            total,
            progress: ++progress,
          })
        },
        error: e => emitter.emit('error', e),
        complete: () => rs(),
      })
    }).then(() => emitter.emit('done')),
  )
  return emitter
}
