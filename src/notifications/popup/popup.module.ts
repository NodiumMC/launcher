import { Module } from 'positron'
import { PopupService } from './popup.service'
import { PopupStore } from './popup.store'
import { FC } from 'react'

@Module
export class PopupModule {
  constructor(private readonly service: PopupService, private readonly store: PopupStore) {}

  get popups() {
    return this.store.popups
  }

  create<T extends object>(template: FC<T>, props: T) {
    return this.service.create(template, props)
  }

  close(id: string) {
    return this.service.close(id)
  }
}
