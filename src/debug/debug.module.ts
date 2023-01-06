import { makeAutoObservable } from 'mobx'
import { Module } from 'positron'

@Module
export class DebugModule {
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
