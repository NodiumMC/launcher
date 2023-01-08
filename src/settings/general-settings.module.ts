import { Module } from 'positron'
import { GeneralSettingsStore } from 'settings/general-settings.store'

@Module
export class GeneralSettingsModule {
  constructor(
    private readonly store: GeneralSettingsStore,
  ) {}

  get gameDir() {
    return this.store.gameDir
  }

  set gameDir(value: string) {
    this.store.gameDir = value
  }
}
