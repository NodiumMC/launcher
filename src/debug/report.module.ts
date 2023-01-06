import { makeAutoObservable } from 'mobx'
import { Module } from 'positron'
import { DebugModule } from './debug.module'

@Module
export class ReportModule {
  cause?: Error
  reported = false

  constructor(private readonly debug: DebugModule) {
    makeAutoObservable(this)
  }

  report(error: Error) {
    this.cause = error
    if (!this.debug.isEnabled) this.reported = true
  }
}
