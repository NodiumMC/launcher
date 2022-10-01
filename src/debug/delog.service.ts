import { Module } from 'mobmarch'
import { action, makeAutoObservable, makeObservable, observable, runInAction } from 'mobx'
import { DelogLine } from 'debug'
import { container } from 'tsyringe'

// const Sopfire = Symbol('Stack overflow prevent flag')

// const up = (logs: DelogLine[], args: any[]) => {
//   const candidate = logs[0].args.every((v, i) => v === args[i])
//   if (candidate) {
//     logs[0].times++
//     return true
//   } else return false
// }

@Module
export class DelogService {
  @observable private _delogs: DelogLine[] = []
  private _times: Record<string | symbol, number> = {}
  private _timers: Record<string | symbol, any> = {}
  private _descriptions: Record<string | symbol, string> = {}

  get logs() {
    return this._delogs
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
    const timed = this.takeTime('Simplified message output:')
    this._delogs.push({
      type: 'default',
      id: performance.now(),
      args: [
        'Добро пожаловать в консоль разработчика. Если вы обычный пользователь, советуем покинуть консоль, т.к. ввод команд сюда может нарушить вашу конфиденциальность',
      ],
    })
    timed()
  }
}

export const log = (...args: any[]) => {
  const delog = container.resolve(DelogService)
  runInAction(() => {
    delog.logs.push({
      type: 'default',
      id: performance.now(),
      args,
    })
  })
}

export const warn = (...args: any[]) => {
  const delog = container.resolve(DelogService)
  runInAction(() => {
    delog.logs.push({
      type: 'warn',
      id: performance.now(),
      args,
    })
  })
}

export const error = (...args: any[]) => {
  const delog = container.resolve(DelogService)
  runInAction(() => {
    delog.logs.push({
      type: 'error',
      id: performance.now(),
      args,
    })
  })
}

export const time = (description: string, key: string | symbol) => {
  return container.resolve(DelogService).takeTime(description, key)
}

export const endTime = (key: string | symbol) => {
  return container.resolve(DelogService).endTime(key)
}
