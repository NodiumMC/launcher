import { makeObservable, observable } from 'mobx'
import type { SupportedLang } from './langs'
import { Launguage } from './langs'
import { singleton } from 'tsyringe'
import { Storage } from '../filesystem/Storage.service'

@singleton()
export class I18n {
  @observable _lang: SupportedLang = 'ru_RU'
  private fallback: SupportedLang = 'ru_RU'

  get lang() {
    return this._lang
  }

  set lang(lang: SupportedLang) {
    this._lang = lang
    this.st._.appearance.lang = lang
  }

  constructor(private readonly st: Storage) {
    makeObservable(this)
    st.onLoad(() => (this._lang = this.st._.appearance.lang ?? 'ru_RU'))
  }

  private check() {
    return !!Launguage[this.lang]
  }

  $(path: string) {
    const lSource = Launguage[this.check() ? this.lang : this.fallback]
    const direct = lSource[path]
    if (direct) return direct
    const pathToTranslate = path.split('.')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let translated: any = lSource
    while (pathToTranslate.length > 0)
      translated = translated[pathToTranslate.shift() ?? '']
    if (!translated) return path
    return translated
  }
}
