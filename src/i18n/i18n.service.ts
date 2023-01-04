import { makeAutoObservable } from 'mobx'
import type { SupportedLang } from 'i18n/langs'
import { Launguage } from 'i18n/langs'
import { R18T } from 'i18n/index'
import { main, sync } from 'storage'
import { singleton } from 'tsyringe'

const fallback: SupportedLang = 'ru_RU'

@singleton()
export class I18n {
  lang: SupportedLang = fallback

  constructor() {
    makeAutoObservable(this)
    sync(
      this,
      'lang',
      'lang',
      (lang: SupportedLang) => lang,
      lang => lang,
    )
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
