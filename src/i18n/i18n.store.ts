import { SupportedLang } from 'i18n/langs'
import { makeAutoObservable } from 'mobx'
import { sync } from 'storage'
import { fallback } from './fallback'
import { Service } from 'positron'

@Service
export class I18nStore {
  lang: SupportedLang = fallback

  constructor() {
    makeAutoObservable(this)
    sync(this, 'lang')
  }
}
