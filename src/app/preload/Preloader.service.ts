import { action, makeObservable, observable } from 'mobx'
import { Awaitable } from 'utils/types'
import { I18n } from '../i18n/i18n.service'
import { singleton } from 'tsyringe'

export type PreloaderQueueTask = () => Awaitable
export type PreloaderQueueUnit = [name: string, task: () => Awaitable]

@singleton()
export class Preloader {
  @observable private queue: PreloaderQueueUnit[] = []
  @observable private processing = false
  @observable private current = ''
  @observable progress = 0
  @observable pre = 0
  @observable progressActive = false

  constructor(private i18n: I18n) {
    makeObservable(this)
  }

  @action
  add(name: string, task: PreloaderQueueTask): Promise<void> {
    return new Promise<void>(resolve => {
      this.queue.push([
        name,
        async () =>
          await task()
            .then(() => resolve())
            .catch((e: unknown) => {
              throw e
            }),
      ])
      this.process()
    })
  }

  get currentTaskName() {
    return this.current.length > 0
      ? this.current
      : this.i18n.$('loading.loading')
  }

  get inProcess(): boolean {
    return this.processing
  }

  private get tasksAvailable(): boolean {
    return this.queue.length > 0
  }

  @action
  private async process() {
    if (this.processing) return
    this.processing = true
    while (this.tasksAvailable) {
      const [name, task] = this.queue.shift() as PreloaderQueueUnit
      this.current = name
      await task()
    }
    this.processing = false
    this.current = ''
  }
}
