import { I18nService } from 'i18n/i18n.service'
import { I18nStore } from 'i18n/i18n.store'
import type { SupportedLang } from 'i18n/langs'
import { R18T } from 'i18n/index'
import { Module } from 'positron'

@Module
export class I18nModule {
  constructor(private readonly service: I18nService, private readonly store: I18nStore) {}

  get lang() {
    return this.store.lang
  }

  set lang(lang: SupportedLang) {
    this.store.lang = lang
  }

  get translate() {
    return this.service.translate
  }

  resolve(fn: R18T | string) {
    return this.service.resolve(fn)
  }
}
