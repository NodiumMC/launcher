import { BeforeResolve, Module } from 'mobmarch'
import { Preloader } from 'preload'
import { JSON5Config } from 'storage/JSON5Config'
import type { SupportedTheme } from 'theme'
import { SupportedLang } from 'i18n/langs'

export interface CentralConfigData {
  appearance: {
    theme: SupportedTheme
    lang: SupportedLang
  }
  main: {
    gameDir: string
  }
}

@Module([Preloader])
export class CentralConfig extends JSON5Config<CentralConfigData> {
  private async [BeforeResolve]() {
    await this.preloader.add('Initializing Storage', this.load.bind(this))
  }

  constructor(private readonly preloader: Preloader) {
    super('config')
    this.load()
  }

  get data(): Partial<CentralConfigData> {
    return super.data
  }
}
