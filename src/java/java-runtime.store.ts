import { Service } from 'positron'
import { makeAutoObservable, toJS } from 'mobx'
import { sync } from 'storage'
import { JvmRuntime } from 'java/java-runtime.types'
import { GeneralSettingsModule } from 'settings'

@Service
export class JavaRuntimeStore {
  runtimes: JvmRuntime[] = []

  constructor(private readonly settings: GeneralSettingsModule) {
    makeAutoObservable(this)
    sync(
      this,
      'runtimes',
      (runtimes: JvmRuntime[]) => runtimes,
      runtimes => toJS(runtimes),
    )
  }

  get list() {
    return this.runtimes.filter(v => v.location === this.settings.gameDir)
  }

  add(name: string, major: number) {
    this.runtimes.push({ name, major, location: this.settings.gameDir })
  }

  has(major: number) {
    return this.list.some(v => v.major === major)
  }

  find(major: number) {
    return this.list.find(v => v.major === major)
  }
}
