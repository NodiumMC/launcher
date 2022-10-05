import { Module } from 'mobmarch'
import { action, makeAutoObservable } from 'mobx'
import { DelogService, warn } from 'debug/delog.service'

@Module
export class DebugService {
  private enabled = false

  constructor(private readonly delog: DelogService) {
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
