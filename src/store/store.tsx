import React from 'react'
import { ThemeService } from 'app/theme/Theme.service'
import { I18n } from 'app/i18n/i18n.service'
import { Storage } from 'app/filesystem/Storage.service'
import { Preloader } from 'app/preload/Preloader.service'
import { container } from 'tsyringe'
import { StartupService } from 'app/preload/Startup.service'
import { PopupService } from 'app/noteup/Popup.service'
import { LauncherConfig } from 'app/settings/LauncherConfig.service'
import { LoggingPool } from 'app/meta/logging/LoggingPool.service'
import { GameProfileService } from 'app/launcher/services/GameProfile.service'

export type GlobalStoreType = {
  storage: Storage
  i18n: I18n
  preloader: Preloader
  theme: ThemeService
  startup: StartupService
  popup: PopupService
  launcherConfig: LauncherConfig
  loggingPool: LoggingPool
  gameProfiles: GameProfileService
}

export const createStore = (): GlobalStoreType => ({
  storage: container.resolve(Storage),
  i18n: container.resolve(I18n),
  preloader: container.resolve(Preloader),
  theme: container.resolve(ThemeService),
  startup: container.resolve(StartupService),
  popup: container.resolve(PopupService),
  launcherConfig: container.resolve(LauncherConfig),
  loggingPool: container.resolve(LoggingPool),
  gameProfiles: container.resolve(GameProfileService),
})

export const StoreContext = React.createContext<GlobalStoreType | null>(null)
