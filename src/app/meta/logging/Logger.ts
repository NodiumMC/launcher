import { action, makeObservable, observable } from 'mobx'

export class Logger {
  private static MAX_LENGTH = 10000
  @observable private std: string = ''
  constructor() {
    makeObservable(this)
  }

  /**
   * Logs messages with newlines
   * @param messages
   */
  @action.bound
  log(...messages: string[]): this {
    this.write(messages.join('\n'))
    return this
  }

  /**
   * Writes the log data
   * @param data The data to log
   */
  @action.bound
  write(data: string): this {
    this.std += data
    return this
  }

  get stdout(): string {
    return this.std.substring(this.std.length - Logger.MAX_LENGTH, this.std.length)
  }
}
