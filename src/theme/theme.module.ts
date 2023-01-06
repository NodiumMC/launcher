import { Module } from 'positron'
import { ThemeStore } from 'theme/theme.store'
import { SupportedTheme, Theme } from 'theme/type'
import { themes } from 'theme/themes'

@Module
export class ThemeModule {
  constructor(private readonly store: ThemeStore) {}

  get theme() {
    return this.store.theme
  }

  set theme(value: SupportedTheme) {
    this.store.theme = value
  }

  get target(): Theme {
    return themes[this.store.theme]
  }
}
