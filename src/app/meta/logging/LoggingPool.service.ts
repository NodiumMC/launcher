import { makeObservable, observable } from 'mobx'
import { Logger } from './Logger'
import { singleton } from 'tsyringe'
import inject from 'flinject'

/**
 * <h1>class LoggingPool</h1>
 * A pool of loggers.
 * @class
 */
@singleton()
export class LoggingPool {
  static readonly Main = Symbol()
  @observable private _pool: Map<Symbol, Logger> = new Map([[LoggingPool.Main, new Logger()]])

  constructor() {
    makeObservable(this)
    console.log = inject(console.log, (_,...args) => {
      this.main.log(`${args.join(' ')}`)
    })
  }

  /**
   * Get a logger from the pool.
   * @param key The key of the logger.
   */
  request(key: Symbol) {
    if (!this._pool.has(key))
      this._pool.set(key, new Logger())
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
  remove(key: Symbol) {
    this._pool.delete(key)
  }
}
