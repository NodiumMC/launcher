import type { SupportedLang } from 'i18n/langs'
import { Launguage } from 'i18n/langs'
import { R18T } from 'i18n/index'
import { I18nStore } from 'i18n/i18n.store'
import { Service } from 'positron'

const fallback: SupportedLang = 'ru_RU'

@Service
export class I18nService {
  constructor(private readonly store: I18nStore) {}

  private check() {
    return !!Launguage[this.store.lang]
  }

  get translate() {
    return Launguage[this.check() ? this.store.lang : fallback]
  }

  resolve(fn: R18T | string): string {
    return typeof fn === 'string' ? fn : fn(this.translate)
  }
}
