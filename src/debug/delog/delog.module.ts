import { Module } from 'positron'
import { DelogStore } from './delog.store'
import { DelogService } from './delog.service'

@Module
export class DelogModule {
  constructor(private readonly store: DelogStore, private readonly service: DelogService) {}

  get logs() {
    return this.store.delogs
  }

  clear() {
    this.store.delogs = []
  }

  reset() {
    this.clear()
    this.store.timers = {}
    this.store.times = {}
    this.store.descriptions = {}
  }

  log(...args: any[]) {
    this.logs.push({ type: 'default', id: performance.now(), args })
  }

  warn(...args: any[]) {
    this.logs.push({ type: 'warn', id: performance.now(), args })
  }

  error(...args: any[]) {
    this.logs.push({ type: 'error', id: performance.now(), args })
  }

  takeTime(description: string, key?: string | symbol) {
    return this.service.takeTime(description, key)
  }

  endTime(key: string | symbol, start?: number, description?: string) {
    return this.service.endTime(key, start, description)
  }
}
