import { singleton } from 'tsyringe'
import { dirname, join } from 'native/path'
import { GeneralSettings } from 'settings/GeneralSettings.service'
import { makeAutoObservable, toJS } from 'mobx'
import { fetchNJDKAsset } from 'java/adoptium'
import { RdownloadLT, Runzip } from 'native/rust'
import { prepare } from 'native/filesystem'
import { Observable } from 'rxjs'
import { sync } from 'storage'
import { w } from 'debug'
import { isUnix } from 'native/os'

export interface JvmRuntime {
  name: string
  major: number
}

export interface InstallProgress {
  stage: number
  total: number
  progress: number
}

@singleton()
export class JavaRuntimeService {
  runtimes: JvmRuntime[] = []

  constructor(private readonly gs: GeneralSettings) {
    makeAutoObservable(this)
    sync(
      this,
      'runtimes',
      'runtimes',
      (runtimes: JvmRuntime[]) => runtimes,
      runtimes => toJS(runtimes),
    )
  }

  get runtimesDir() {
    return join(this.gs.gameDir, 'runtimes')
  }

  async install(major: number) {
    major = Math.max(17, major)
    const { url, name } = await fetchNJDKAsset(major)
    const filename = join(await prepare(this.runtimesDir), `${name}.${isUnix ? 'tar.gz' : 'zip'}`)
    return RdownloadLT(url, filename).pipe(
      o =>
        new Observable<InstallProgress>(subscriber => {
          const s = o.subscribe({
            next: value => subscriber.next({ stage: 0, total: value.total, progress: value.transferred }),
            error: subscriber.error.bind(subscriber),
            complete: () => {
              Runzip(filename, dirname(filename), true).subscribe({
                error: subscriber.error.bind(subscriber),
                next: value => subscriber.next({ stage: 1, ...value }),
                complete: () => {
                  if (!this.runtimes.some(v => v.major === major)) this.runtimes.push({ major, name })
                  subscriber.complete()
                },
              })
            },
          })
          return () => s.unsubscribe()
        }),
    )
  }

  async for(major: number) {
    major = Math.max(17, major)
    const jdk = this.runtimes.find(v => v.major === major)
    if (!jdk) w(t => t.no_compatible_jdks, `No compatible JDKS installed. Expected: ${jdk}`)
    return join(this.runtimesDir, jdk.name, 'bin', 'javaw')
  }

  async installIfNot(major: number) {
    major = Math.max(17, major)
    if (this.runtimes.some(v => v.major === major)) return
    return this.install(major)
  }
}
