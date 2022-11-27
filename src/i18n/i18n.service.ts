import { makeAutoObservable } from 'mobx'
import type { SupportedLang } from 'i18n/langs'
import { Launguage } from 'i18n/langs'
import { BeforeResolve, Module } from 'mobmarch'
import { R18T } from 'i18n/index'
import { main } from 'storage'

const fallback: SupportedLang = 'ru_RU'

@Module
export class I18n {
  private _lang: SupportedLang = fallback

  private [BeforeResolve]() {
    this._lang = main.lang
  }

  get lang() {
    return this._lang
  }

  set lang(lang: SupportedLang) {
    this._lang = lang
    main.lang = lang
  }

  constructor() {
    makeAutoObservable(this)
  }

  private check() {
    return !!Launguage[this.lang]
  }

  get translate() {
    return Launguage[this.check() ? this.lang : fallback]
  }

  resolve(fn: R18T | string): string {
    return typeof fn === 'string' ? fn : fn(this.translate)
  }
}
