import { Service } from 'positron'
import { makeAutoObservable } from 'mobx'
import { InstanceModule } from 'minecraft/instance'
import { sync } from 'storage'
import { InstanceLocalType } from 'minecraft/instance/instance.types'
import { GeneralSettingsModule } from 'settings'

@Service
export class InstancesStore {
  instancesv02: InstanceModule[] = []

  constructor(private readonly settings: GeneralSettingsModule) {
    makeAutoObservable(this)
    sync(
      this,
      'instancesv02',
      (instances: InstanceLocalType[]) => instances.map(local => InstanceModule.fromJson(local)),
      instances => instances.map(v => v.local.toJSON()),
    )
  }

  get instances() {
    return this.instancesv02.filter(v => v.origin === this.settings.gameDir)
  }

  add(instance: InstanceModule) {
    this.instancesv02.push(instance)
  }

  remove(instance: InstanceModule) {
    this.instancesv02.removeIf(v => v === instance)
  }
}
