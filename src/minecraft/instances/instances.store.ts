import { Service } from 'positron'
import { makeAutoObservable } from 'mobx'
import { InstanceModule } from 'minecraft/instance'
import { sync } from 'storage'
import { InstanceLocalType } from 'minecraft/instance/instance.types'

@Service
export class InstancesStore {
  instancesv02: InstanceModule[] = []

  constructor() {
    makeAutoObservable(this)
    sync(
      this,
      'instancesv02',
      (instances: InstanceLocalType[]) => instances.map(local => InstanceModule.fromJson(local)),
      instances => instances.map(v => v.local.toJSON()),
    )
  }

  get instances() {
    return this.instancesv02
  }

  add(instance: InstanceModule) {
    this.instances.push(instance)
  }

  remove(instance: InstanceModule) {
    this.instances.removeIf(v => v === instance)
  }
}
