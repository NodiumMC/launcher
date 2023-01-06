import { Module } from 'positron'
import { JavaRuntimeService } from './java-runtime.service'
import { JavaRuntimeStore } from './java-runtime.store'

@Module
export class JavaRuntimeModule {
  constructor(private readonly service: JavaRuntimeService, private readonly store: JavaRuntimeStore) {}

  async for(major: number) {
    return this.service.for(major)
  }

  async install(major: number) {
    return this.service.installIfNot(major)
  }

  get runtimes() {
    return this.store.runtimes
  }
}
