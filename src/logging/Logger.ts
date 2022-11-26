import { makeAutoObservable } from 'mobx'

export class Logger {
  private static MAX_LENGTH = 10000
  private std = ''

  constructor() {
    makeAutoObservable(this)
  }

  /**
   * Logs messages with newlines
   * @param messages
   */
  log(...messages: string[]): this {
    this.write(messages.map(v => v + '\n').join(''))
    return this
  }

  /**
   * Writes the log data
   * @param data The data to log
   */
  write(data: string): this {
    this.std += data
    return this
  }

  get stdout(): string {
    return this.std.substring(this.std.length - Logger.MAX_LENGTH, this.std.length)
  }
}
