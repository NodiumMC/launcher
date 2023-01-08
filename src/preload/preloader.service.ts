import { PreloaderStore } from './preloader.store'
import { PreloaderQueueTask, PreloaderQueueUnit } from './preloader.types'
import { Service } from 'positron'

@Service
export class PreloaderService {
  constructor(private readonly store: PreloaderStore) {}

  spawn(name: string, task: PreloaderQueueTask): Promise<void> {
    return new Promise<void>(resolve => {
      this.store.add(name, async () => {
        await task()
          .then(() => resolve())
          .catch((e: unknown) => {
            throw e
          })
      })
      this.process()
    })
  }

  private async process() {
    if (this.store.processing) return
    this.store.processing = true
    while (this.store.available) {
      const [name, task] = this.store.next() as PreloaderQueueUnit
      this.store.current = name
      await task()
    }
    this.store.processing = false
    this.store.current = ''
  }
}
