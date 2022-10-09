import { makeAutoObservable } from 'mobx'
import type { SupportedTheme, Theme } from 'theme'
import { deviceThemeIsDark, themes } from 'theme'
import { CentralConfig } from 'storage'
import { Module } from 'mobmarch'
import { Preloader } from 'preload'
import { I18n } from 'i18n'

@Module([CentralConfig, Preloader, I18n])
export class ThemeService {
  private _theme: SupportedTheme = deviceThemeIsDark() ? 'dark' : 'light'

  constructor(private readonly config: CentralConfig) {
    makeAutoObservable(this)
    this.update()
  }

  update() {
    this._theme = this.config.get('appearance.theme', this._theme)
  }

  get current() {
    return this._theme
  }

  get theme(): Theme {
    return themes[this._theme]
  }

  async setTheme(theme: SupportedTheme) {
    this._theme = theme
    this.config.set('appearance.theme', this._theme)
  }
}
