import { autorun, makeAutoObservable } from 'mobx'
import type { SupportedTheme, Theme } from 'theme'
import { themes } from 'theme'
import { main } from 'storage'
import { singleton } from 'tsyringe'

@singleton()
export class ThemeService {
  private _theme: SupportedTheme = 'dark'

  constructor() {
    makeAutoObservable(this)
    autorun(() => {
      if (main.theme !== null) this._theme = main.theme
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
