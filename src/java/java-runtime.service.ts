import { dirname, join } from 'native/path'
import { fetchNJDKAsset } from './adoptium'
import { RdownloadLT, Runzip } from 'native/rust'
import { prepare } from 'native/filesystem'
import { Observable } from 'rxjs'
import { w } from 'debug'
import { isUnix } from 'native/os'
import { Service } from 'positron'
import { JavaRuntimeStore } from './java-runtime.store'
import { GeneralSettingsModule } from 'settings'
import { InstallProgress } from './java-runtime.types'

@Service
export class JavaRuntimeService {
  constructor(private readonly gs: GeneralSettingsModule, private readonly store: JavaRuntimeStore) {}

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
                  if (!this.store.has(major)) this.store.add(name, major)
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
    const jdk = this.store.find(major)
    if (!jdk) w(t => t.no_compatible_jdks, `No compatible JDKS installed. Expected: ${jdk}`)
    return join(this.runtimesDir, jdk.name, 'bin', 'javaw')
  }

  async installIfNot(major: number) {
    major = Math.max(17, major)
    if (this.store.has(major)) return
    return this.install(major)
  }
}
