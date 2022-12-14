import { autorun, makeAutoObservable } from 'mobx'
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
    main.lang = lang
  }

  constructor() {
    makeAutoObservable(this)
    autorun(() => {
      if (main.lang !== null) this._lang = main.lang
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
}
