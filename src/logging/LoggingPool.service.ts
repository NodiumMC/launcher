import { makeObservable, observable } from 'mobx'
import { Logger } from 'logging'
import inject from 'flinject'
import { Module } from 'mobmarch'

/**
 * <h1>class LoggingPool</h1>
 * A pool of loggers.
 * @class
 */
@Module
export class LoggingPool {
  static readonly Main = Symbol()
  @observable private _pool: Map<symbol, Logger> = new Map([[LoggingPool.Main, new Logger()]])

  constructor() {
    makeObservable(this)
    console.log = inject(console.log, (_, ...args) => {
      this.main.log(`${args.join(' ')}`)
    })
  }

  /**
   * Get a logger from the pool.
   * @param key The key of the logger.
   */
  request(key: symbol) {
    if (!this._pool.has(key)) this._pool.set(key, new Logger())
    return this._pool.get(key)!
  }

  /**
   * Get the main logger.
   */
  get main() {
    return this._pool.get(LoggingPool.Main)!
  }

  /**
   * Removes a logger from the pool.
   */
  remove(key: symbol) {
    this._pool.delete(key)
  }

  get keys() {
    return this._pool.keys()
  }

  [Symbol.iterator]() {
    return this._pool.entries()
  }
}
