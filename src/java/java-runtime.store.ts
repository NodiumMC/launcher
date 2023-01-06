import { Service } from 'positron'
import { makeAutoObservable, toJS } from 'mobx'
import { sync } from 'storage'
import { JvmRuntime } from 'java/java-runtime.types'

@Service
export class JavaRuntimeStore {
  runtimes: JvmRuntime[] = []

  constructor() {
    makeAutoObservable(this)
    sync(
      this,
      'runtimes',
      (runtimes: JvmRuntime[]) => runtimes,
      runtimes => toJS(runtimes),
    )
  }

  has(major: number) {
    return this.runtimes.some(v => v.major === major)
  }

  add(name: string, major: number) {
    this.runtimes.push({ name, major })
  }

  find(major: number) {
    return this.runtimes.find(v => v.major === major)
  }
}
