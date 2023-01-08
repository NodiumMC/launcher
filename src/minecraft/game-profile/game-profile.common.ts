import { Service } from 'positron'
import { GeneralSettingsModule } from 'settings'
import { join } from 'native/path'

@Service
export class GameProfileCommon {
  constructor(private readonly settings: GeneralSettingsModule) {}

  get pathToProfile() {
    return join(this.settings.gameDir, 'launcher_profiles.json')
  }
}
