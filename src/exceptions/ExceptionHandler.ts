import { singleton } from 'tsyringe'
import { action, makeObservable, observable } from 'mobx'
import { ErrorHandler, HandlingPair, ErrorConstructor } from 'exceptions/types'

@singleton()
export class ExceptionHandler {
  @observable private unhandled: Error[] = []
  private handlers: HandlingPair<never>[] = []

  constructor() {
    makeObservable(this)
  }

  handle<T extends Error>(type: ErrorConstructor<T>, handler: ErrorHandler<T>) {
    this.handlers.push([type, handler])
  }

  private handlePipe(error: Error) {
    for (const [type, handler] of this.handlers) {
      if (error instanceof type) {
        handler(error as never)
        return true
      }
    }
    return false
  }

  @action.bound
  throw(error: Error) {
    if (this.handlePipe(error)) return
    this.unhandled.push(error)
  }

  ejectUnhandled() {
    const unhandled = this.unhandled
    this.unhandled = []
    return unhandled
  }
}
