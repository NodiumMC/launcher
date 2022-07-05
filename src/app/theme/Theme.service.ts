import { action, computed, makeObservable, observable } from 'mobx'
import { darkTheme, lightTheme } from '../../style/themes/theme'
import { Storage } from '../filesystem/Storage.service'
import { singleton } from 'tsyringe'
import type { Nullable } from '../../utils/types'

@singleton()
export class ThemeService {
  @observable
  private isDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  constructor(private st: Storage) {
    makeObservable(this)
  }

  @action.bound
  toggle() {
    this.isDark = !this.isDark
    this.st._.appearance.darkTheme = this.isDark
  }

  @action.bound
  update() {
    this.isDark = this.st._.appearance.darkTheme ?? this.isDark
  }

  @computed
  get theme() {
    return this.isDark ? darkTheme : lightTheme
  }

  @action.bound
  setTheme(isDark: Nullable<boolean>) {
    this.isDark = isDark ?? window.matchMedia('(prefers-color-scheme: dark)').matches
    this.st._.appearance.darkTheme = isDark
  }
}
