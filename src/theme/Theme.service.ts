import { action, computed, makeObservable, observable } from 'mobx'
import { darkTheme, lightTheme } from 'theme'
import { CentralConfig } from 'config'
import type { Nullable } from 'utils/types'
import { Module } from 'mobmarch'
import { deviceThemeIsDark } from 'theme'

@Module([CentralConfig])
export class ThemeService {
  @observable
  private isDark = deviceThemeIsDark()

  constructor(private cc: CentralConfig) {
    makeObservable(this)
    this.isDark = this.cc.data.appearance.darkTheme ?? this.isDark
  }

  private async saveTheme() {
    await this.cc.save()
  }

  @action.bound
  toggle() {
    this.isDark = !this.isDark
    this.cc.data.appearance.darkTheme = this.isDark
    this.saveTheme()
  }

  @action.bound
  update() {
    this.isDark = this.cc.data.appearance.darkTheme ?? this.isDark
    this.saveTheme()
  }

  @computed
  get theme() {
    return this.isDark ? darkTheme : lightTheme
  }

  @action.bound
  setTheme(isDark: Nullable<boolean>) {
    this.isDark =
      isDark ?? window.matchMedia('(prefers-color-scheme: dark)').matches
    this.cc.data.appearance.darkTheme = isDark
    this.saveTheme()
  }
}
