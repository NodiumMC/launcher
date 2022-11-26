import { readDir } from '@tauri-apps/api/fs'
import { Runzip, RUnzipProgress } from 'native/rust'
import { Observable } from 'rxjs'
import { prepare } from 'native/filesystem'

export const unzipNatives = (dir: string) =>
  new Observable<RUnzipProgress>(subscriber => {
    void (async () => {
      await prepare(dir)
      const files = await readDir(dir).then(v => v.filter(v => v.name?.endsWith('.jar')))
      let total = 0
      let progress = 0
      if (files.length === 0) {
        setTimeout(() => subscriber.complete(), 0)
        return
      }
      files.mapAsync(file =>
        new Promise<void>(rs => {
          let totalized = false
          Runzip(file.path, dir).subscribe({
            next: (unp: RUnzipProgress) => {
              if (!totalized) total += unp.total
              totalized = true
              subscriber.next({
                total,
                progress: ++progress,
              })
            },
            error: e => subscriber.error(e),
            complete: () => rs(),
          })
        }).then(() => subscriber.complete()),
      )
    })()
  })
