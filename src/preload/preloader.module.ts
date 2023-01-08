import { Module } from 'positron'
import { PreloaderService } from './preloader.service'
import { PreloaderQueueTask } from './preloader.types'
import { PreloaderStore } from 'preload/preloader.store'

@Module
export class PreloaderModule {
  constructor(private readonly service: PreloaderService, private readonly store: PreloaderStore) {}

  spawn(name: string, task: PreloaderQueueTask): Promise<void> {
    return this.service.spawn(name, task)
  }

  get taskName() {
    return this.store.currentTaskName
  }

  get progress() {
    return this.store.processing
  }
}
