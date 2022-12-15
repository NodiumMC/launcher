import { makeAutoObservable } from 'mobx'
import { container, singleton } from 'tsyringe'
import { DebugService } from 'debug/debug.service'

@singleton()
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
