import { Module } from 'positron'
import { NetworkCheckerService } from './network-checker.service'
import { NetworkCheckerStore } from './network-checker.store'

@Module
export class NetworkCheckerModule {
  constructor(private readonly service: NetworkCheckerService, private readonly store: NetworkCheckerStore) {}

  get available() {
    return this.store.available
  }

  get lastPing() {
    return this.store.pings.last
  }

  get avgPing() {
    return this.store.pings.reduce((a, c) => a + c, 0) / this.store.pings.length
  }

  get events() {
    return this.store.events
  }

  update(value = true) {
    this.service.update(value)
  }
}
