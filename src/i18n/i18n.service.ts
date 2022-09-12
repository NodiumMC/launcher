import { makeObservable, observable } from 'mobx'
import type { SupportedLang } from 'i18n/langs'
import { Launguage } from 'i18n/langs'
import { CentralConfig } from 'config'
import { Module } from 'mobmarch'
import { R18T } from 'i18n/index'

const fallback: SupportedLang = 'en_US'

@Module([CentralConfig])
export class I18n {
  @observable _lang: SupportedLang = 'ru_RU'

  get lang() {
    return this._lang
  }

  set lang(lang: SupportedLang) {
    this._lang = lang
    this.cc.data.appearance.lang = lang
  }

  constructor(private readonly cc: CentralConfig) {
    makeObservable(this)
    this._lang = this.cc.data.appearance.lang ?? 'ru_RU'
  }

  private check() {
    return !!Launguage[this.lang]
  }

  get translate() {
    return Launguage[this.check() ? this.lang : fallback]
  }

  resolve(fn: R18T) {
    return fn(this.translate)
  }
}
