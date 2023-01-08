import { Module } from 'positron'
import { InstancesStore } from './instances.store'
import { InstanceModule } from 'minecraft/instance'

@Module
export class InstancesModule {
  constructor(private readonly store: InstancesStore) {}

  get instances() {
    return this.store.instances
  }

  get moreLastUsed() {
    return this.instances.slice().sort((a, b) => b.lastUsed - a.lastUsed).first
  }

  add(instance: InstanceModule) {
    this.store.add(instance)
  }

  remove(instance: InstanceModule) {
    this.store.remove(instance)
  }

  get hasAnyRunners() {
    return this.instances.some(v => v.working)
  }
}
