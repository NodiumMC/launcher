import { autorun, makeAutoObservable } from 'mobx'
import type { SupportedTheme, Theme } from 'theme'
import { themes } from 'theme'
import { Module } from 'mobmarch'
import { Preloader } from 'preload'
import { I18n } from 'i18n'
import { main } from 'storage'

@Module([Preloader, I18n])
export class ThemeService {
  private _theme: SupportedTheme = 'dark'

  constructor() {
    makeAutoObservable(this)
    autorun(() => {
      this._theme = main.theme
    })
  }

  get current() {
    return this._theme
  }

  get theme(): Theme {
    return themes[this._theme]
  }

  async setTheme(theme: SupportedTheme) {
    this._theme = theme
    main.theme = theme
  }
}
