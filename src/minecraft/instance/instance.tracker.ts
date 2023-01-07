import { DynamicService } from 'positron'
import { makeObservable, observable } from 'mobx'
import { Progress } from 'utils'

@DynamicService
export class InstanceTracker {
  static dyn(): InstanceTracker {
    return new this()
  }

  @observable busy = false
  @observable progress = new Progress(100, 0, 0)

  constructor() {
    makeObservable(this)
  }
}
