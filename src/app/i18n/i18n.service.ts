import { makeObservable, observable } from 'mobx'
import type { SupportedLang } from './langs'
import { Launguage } from './langs'
import { singleton } from 'tsyringe'

@singleton()
export class I18n {
  @observable lang: SupportedLang = navigator.language.replaceAll('-', '_') as SupportedLang
  private fallback: SupportedLang = 'ru_RU'

  constructor() {
    makeObservable(this)
  }

  private check() {
    return !!Launguage[this.lang]
  }

  $(path: string) {
    const lSource = Launguage[this.check() ? this.lang : this.fallback]
    const direct = lSource[path]
    if (direct) return direct
    const pathToTranslate = path.split('.')
    let translated: any = lSource
    while (pathToTranslate.length > 0)
      translated = translated[pathToTranslate.shift() ?? '']
    if (!translated) return path
    return translated
  }
}
