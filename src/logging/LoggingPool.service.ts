import { makeObservable, observable } from 'mobx'
import { Logger } from 'logging'
import { Module } from 'mobmarch'

/**
 * <h1>class LoggingPool</h1>
 * A pool of loggers.
 * @class
 */
@Module
export class LoggingPool {
  @observable private _pool: Map<symbol, Logger> = new Map()

  constructor() {
    makeObservable(this)
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
