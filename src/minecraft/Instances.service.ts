import { singleton } from 'tsyringe'
import { makeObservable } from 'mobx'

@singleton()
export class InstancesService {
  constructor() {
    makeObservable(this)
  }
}
