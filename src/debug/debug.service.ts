import { Module } from 'mobmarch'
import { action, makeAutoObservable } from 'mobx'

@Module
export class DebugService {
  private enabled = false

  constructor() {
    makeAutoObservable(this)
  }

  get isEnabled() {
    return this.enabled
  }

  @action
  toggle() {
    this.enabled = !this.enabled
  }
}
