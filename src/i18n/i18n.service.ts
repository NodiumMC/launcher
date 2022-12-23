import { makeAutoObservable } from 'mobx'
import type { SupportedLang } from 'i18n/langs'
import { Launguage } from 'i18n/langs'
import { R18T } from 'i18n/index'
import { main } from 'storage'
import { singleton } from 'tsyringe'

const fallback: SupportedLang = 'ru_RU'

@singleton()
export class I18n {
  private _lang: SupportedLang = fallback

  get lang() {
    return this._lang
  }

  set lang(lang: SupportedLang) {
    this._lang = lang
    main.setItem('lang', lang)
  }

  constructor() {
    makeAutoObservable(this)
    main.getItem<SupportedLang>('lang').then(lang => {
      if (lang) this._lang = lang
    })
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

  async setLang(lang: SupportedLang) {
    this._lang = lang
    await main.setItem('lang', lang)
  }
}
