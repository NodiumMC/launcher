import { makeAutoObservable } from 'mobx'
import { singleton } from 'tsyringe'

export type PreloaderQueueTask = () => Awaitable
export type PreloaderQueueUnit = [name: string, task: () => Awaitable]

@singleton()
export class Preloader {
  private queue: PreloaderQueueUnit[] = []
  private processing = false
  private current = ''

  constructor() {
    makeAutoObservable(this)
  }

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
    return this.current.length > 0 ? this.current : 'Loading'
  }

  get inProcess(): boolean {
    return this.processing
  }

  private get tasksAvailable(): boolean {
    return this.queue.length > 0
  }

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
