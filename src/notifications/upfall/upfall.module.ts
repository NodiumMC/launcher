import { Module } from 'positron'
import { UpfallService } from './upfall.service'
import { Upfall } from './upfall.types'
import { R18T } from 'i18n'
import { UpfallStore } from './upfall.store'

@Module
export class UpfallModule {
  constructor(private readonly service: UpfallService, private readonly store: UpfallStore) {}

  drop(type: Upfall['type'], content: string | R18T, icon?: Upfall['icon']) {
    this.service.drop(type, content, icon)
  }

  get upfalls() {
    return this.store.upfalls
  }
}
