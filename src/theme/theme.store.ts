import { Service } from 'positron'
import { SupportedTheme } from 'theme/type'
import { makeAutoObservable } from 'mobx'
import { sync } from 'storage'

@Service
export class ThemeStore {
  theme: SupportedTheme = 'dark'

  constructor() {
    makeAutoObservable(this)
    sync(this, 'theme')
  }
}
