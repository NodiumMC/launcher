import { Module } from 'mobmarch'
import { action, makeAutoObservable } from 'mobx'

@Module
export class DebugService {
  private enabled = false

  constructor() {
    makeAutoObservable(this)
  }

  @action
  toggle() {
    this.enabled = !this.enabled
  }
}
