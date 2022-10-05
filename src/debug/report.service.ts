import { Module } from 'mobmarch'
import { makeAutoObservable } from 'mobx'
import { container } from 'tsyringe'
import { DebugService } from 'debug/debug.service'

@Module
export class ReportService {
  cause?: Error
  reported = false

  constructor() {
    makeAutoObservable(this)
  }

  report(error: Error) {
    this.cause = error
    if (!container.resolve(DebugService).isEnabled) this.reported = true
  }
}
