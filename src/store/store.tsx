import React from 'react'
import { ThemeService } from '../app/theme/Theme.service'
import { I18n } from '../app/i18n/i18n.service'
import { Storage } from '../app/filesystem/Storage.service'
import { Preloader } from '../app/preload/Preloader.service'
import { container } from 'tsyringe'
import { StartupService } from '../app/preload/Startup.service'

export type GlobalStoreType = {
  storage: Storage
  i18n: I18n
  preloader: Preloader
  theme: ThemeService
  startup: StartupService,
}

export const createStore = (): GlobalStoreType => ({
  storage: container.resolve(Storage),
  i18n: container.resolve(I18n),
  preloader: container.resolve(Preloader),
  theme: container.resolve(ThemeService),
  startup: container.resolve(StartupService),
})

export const StoreContext = React.createContext<GlobalStoreType | null>(null)
