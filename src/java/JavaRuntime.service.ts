import { singleton } from 'tsyringe'
import { dirname, join } from 'native/path'
import { GeneralSettings } from 'settings/GeneralSettings.service'
import { autorun, makeAutoObservable, toJS } from 'mobx'
import { fetchNJDKAsset } from 'java/adoptium'
import { RdownloadLT, Runzip } from 'native/rust'
import { prepare } from 'native/filesystem'
import { Observable } from 'rxjs'
import { main } from 'storage'

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
    const { url, name } = await fetchNJDKAsset(major)
    const filename = join(await prepare(await this.runtimesDir()), `${name}.zip`)
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
                  this._runtimes.push({ major, name })
                  subscriber.complete()
                },
              })
            },
          })
          return () => s.unsubscribe()
        }),
    )
  }
}
