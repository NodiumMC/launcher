import { action, makeObservable, observable, runInAction } from 'mobx'
import { DelogLine } from 'debug'
import { container, singleton } from 'tsyringe'

@singleton()
export class DelogService {
  @observable private _delogs: DelogLine[] = []
  private _times: Record<string | symbol, number> = {}
  private _timers: Record<string | symbol, any> = {}
  private _descriptions: Record<string | symbol, string> = {}

  get logs() {
    return this._delogs
  }

  clear() {
    this._delogs = []
  }

  reset() {
    this.clear()
    this._times = {}
    this._times = {}
    this._descriptions = {}
  }

  @action
  takeTime(description: string, key: string | symbol = Symbol()) {
    const start = performance.now()
    this._timers[key] = start
    this._descriptions[key] = description
    return () => this.endTime(key, start)
  }

  @action
  endTime(key: string | symbol, start?: number, description?: string) {
    const took = performance.now() - (start ?? this._timers[key])
    this._delogs.push({
      type: 'time',
      args: [description ?? this._descriptions[key]],
      id: performance.now(),
      time: took,
      delta: this._times[key] !== undefined ? took - this._times[key] : 0,
    })
    if (key) this._times[key] = took
  }

  constructor() {
    makeObservable(this)
  }
}

export const log = (...args: any[]) => {
  const delog = container.resolve(DelogService)
  runInAction(() => {
    delog.logs.push({
      type: 'default',
      id: performance.now(),
      args: args ?? [],
    })
  })
}

export const warn = (...args: any[]) => {
  const delog = container.resolve(DelogService)
  runInAction(() => {
    delog.logs.push({
      type: 'warn',
      id: performance.now(),
      args: args ?? [],
    })
  })
}

export const error = (...args: any[]) => {
  const delog = container.resolve(DelogService)
  runInAction(() => {
    delog.logs.push({
      type: 'error',
      id: performance.now(),
      args: args ?? [],
    })
  })
}

export const time = (description: string, key: string | symbol) => {
  return container.resolve(DelogService).takeTime(description, key)
}

export const endTime = (key: string | symbol) => {
  return container.resolve(DelogService).endTime(key)
}
