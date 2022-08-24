import { action, computed, makeObservable, observable } from 'mobx'
import type { SupportedTheme, Theme } from 'theme'
import { CentralConfig } from 'config'
import { Module } from 'mobmarch'
import { deviceThemeIsDark, themes } from 'theme'

@Module([CentralConfig])
export class ThemeService {
  @observable
  private _theme: SupportedTheme = deviceThemeIsDark() ? 'dark' : 'light'

  constructor(private cc: CentralConfig) {
    makeObservable(this)
    this._theme = this.cc.data.appearance.theme ?? this._theme
  }

  private async saveTheme() {
    await this.cc.save()
  }

  @action.bound
  update() {
    this._theme = this.cc.data.appearance.theme ?? this._theme
    this.saveTheme()
  }

  get current() {
    return this._theme
  }

  get theme(): Theme {
    return themes[this._theme]
  }

  @action.bound
  setTheme(theme: SupportedTheme) {
    this._theme = theme
    this.cc.data.appearance.theme = this._theme
    this.saveTheme()
  }
}
