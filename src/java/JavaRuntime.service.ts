import { singleton } from 'tsyringe'
import { dirname, join } from 'native/path'
import { GeneralSettings } from 'settings/GeneralSettings.service'
import { autorun, makeAutoObservable, toJS } from 'mobx'
import { fetchNJDKAsset } from 'java/adoptium'
import { RdownloadLT, Runzip } from 'native/rust'
import { prepare } from 'native/filesystem'
import { Observable } from 'rxjs'
import { main } from 'storage'
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
  private _runtimes: JvmRuntime[] = []

  constructor(private readonly gs: GeneralSettings) {
    makeAutoObservable(this)
    autorun(() => main.setItem('runtimes', toJS(this._runtimes)))
    main.getItem<JvmRuntime[]>('runtimes').then(rs => (this._runtimes = rs ?? []))
  }

  get runtimes() {
    return this._runtimes
  }

  async runtimesDir() {
    return join(await this.gs.getGameDir(), 'runtimes')
  }

  async install(major: number) {
    major = Math.max(17, major)
    const { url, name } = await fetchNJDKAsset(major)
    const filename = join(await prepare(await this.runtimesDir()), `${name}.${isUnix ? 'tar.gz' : 'zip'}`)
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
                  if (!this.runtimes.some(v => v.major === major)) this._runtimes.push({ major, name })
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
    const jdk = this._runtimes.find(v => v.major === major)
    if (!jdk) w(t => t.no_compatible_jdks, `No compatible JDKS installed. Expected: ${jdk}`)
    return join(await this.runtimesDir(), jdk.name, 'bin', 'java')
  }

  async installIfNot(major: number) {
    major = Math.max(17, major)
    if (this.runtimes.some(v => v.major === major)) return
    return this.install(major)
  }
}
