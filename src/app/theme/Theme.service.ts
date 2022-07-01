import { Service } from 'typedi'
import { action, computed, makeObservable, observable } from 'mobx'
import { darkTheme, lightTheme } from '../../style/themes/theme'
import 'reflect-metadata';

@Service()
export class ThemeService {
  @observable
  private isDark = false

  constructor() {
    makeObservable(this)
  }

  @action.bound
  toggle() {
    this.isDark = !this.isDark
  }

  @computed
  get theme() {
    return this.isDark ? darkTheme : lightTheme
  }
}
