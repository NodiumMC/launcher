import { Instance, InstanceLocal } from './Instance'
import { main } from 'storage'
import { autorun, makeAutoObservable, toJS } from 'mobx'
import { singleton } from 'tsyringe'

@singleton()
export class InstanceStore {
  instances: Instance[] = []

  constructor() {
    makeAutoObservable(this)
    main.getItem<InstanceLocal[]>('instances').then(instances => {
      if (instances) this.instances = instances.map(Instance.fromLocal)
    })
    autorun(() => {
      main.setItem(
        'instances',
        toJS(
          this.instances.map(v => {
            const local = v.toLocal()
            return { ...local, settings: toJS(local.settings), vid: toJS(local.vid) }
          }),
        ),
      )
    })
  }

  remove(instance: Instance) {
    this.instances = this.instances.filter(v => v !== instance)
  }
}
