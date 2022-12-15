import { makeAutoObservable } from 'mobx'
import { singleton } from 'tsyringe'

@singleton()
export class DebugService {
  private enabled = false

  constructor() {
    makeAutoObservable(this)
  }

  get isEnabled() {
    return this.enabled
  }

  toggle() {
    this.enabled = !this.enabled
  }
}
