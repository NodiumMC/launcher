import { Service } from 'positron'
import { makeAutoObservable } from 'mobx'
import { PreloaderQueueUnit } from './preloader.types'

@Service
export class PreloaderStore {
  queue: PreloaderQueueUnit[] = []
  processing = false
  current = ''

  constructor() {
    makeAutoObservable(this)
  }

  add(name: string, task: () => Awaitable) {
    this.queue.push([name, task])
  }

  get currentTaskName() {
    return this.current.length > 0 ? this.current : 'Loading'
  }

  get available() {
    return this.queue.length > 0
  }

  next() {
    return this.queue.shift()
  }
}
