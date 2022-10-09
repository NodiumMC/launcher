import { makeAutoObservable } from 'mobx'
import type { SupportedLang } from 'i18n/langs'
import { Launguage } from 'i18n/langs'
import { CentralConfig } from 'storage'
import { BeforeResolve, Module } from 'mobmarch'
import { R18T } from 'i18n/index'

const fallback: SupportedLang = 'en_US'

@Module([CentralConfig])
export class I18n {
  private _lang: SupportedLang = fallback

  private [BeforeResolve]() {
    this._lang = this.config.get('appearance.lang', fallback)
  }

  get lang() {
    return this._lang
  }

  set lang(lang: SupportedLang) {
    this._lang = lang
    this.config.set('appearance.lang', lang)
  }

  constructor(private readonly config: CentralConfig) {
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
