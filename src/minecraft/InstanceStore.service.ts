import { Instance, InstanceLocal } from './Instance'
import { sync } from 'storage'
import { makeAutoObservable, toJS } from 'mobx'
import { singleton } from 'tsyringe'

@singleton()
export class InstanceStore {
  instances: Instance[] = []

  constructor() {
    makeAutoObservable(this)
    sync(
      this,
      'instances',
      'instances',
      (instances: InstanceLocal[]) => instances.map(Instance.fromLocal),
      instances =>
        toJS(
          instances.map(v => {
            const local = v.toLocal()
            return { ...local, settings: toJS(local.settings), vid: toJS(local.vid), logs: toJS(local.logs) }
          }),
        ),
    )
  }

  remove(instance: Instance) {
    this.instances = this.instances.filter(v => v !== instance)
  }

  get lastUsed() {
    return this.instances.slice().sort((a, b) => b.lastUsed - a.lastUsed)[0]
  }
}
