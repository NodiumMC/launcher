import { LauncherProfileJSON, LauncherProfiles } from 'core'
import { join } from 'native/path'
import { prepare, writeJsonFile } from 'native/filesystem'
import { fetchMinecraftVersions, Provider } from 'core/providers'
import { PublicVersion } from 'core/providers/types'
import { Service } from 'positron'
import { GameProfileStore } from './game-profile.store'
import { GeneralSettingsModule } from 'settings'
import { GameProfileCommon } from 'minecraft/game-profile/game-profile.common'

@Service
export class GameProfileService {
  constructor(
    private readonly store: GameProfileStore,
    private readonly settings: GeneralSettingsModule,
    private readonly common: GameProfileCommon,
  ) {}

  private build(name: string, vid: string, version: PublicVersion): LauncherProfileJSON {
    return {
      created: new Date().toISOString(),
      lastVersionId: vid,
      type: version.isRelease
        ? version.latest
          ? 'latest-release'
          : 'release'
        : version.isSnapshot
        ? version.latest
          ? 'latest-snapshot'
          : 'snapshot'
        : 'custom',
      name,
    }
  }

  async create(provider: Provider, version: PublicVersion, vid: string, name: string, ...properties: string[]) {
    const clientDir = await prepare(join(this.settings.gameDir, 'versions', vid))
    const jsonPath = join(clientDir, `${vid}.json`)
    const json = await provider(version.id, ...properties)
    await prepare(clientDir)
    await writeJsonFile(jsonPath, json)
    const profile = this.build(name, vid, version)
    this.store.add(profile)
    return profile
  }

  async fetchAllVersions(): Promise<PublicVersion[]> {
    const publicVersions = (this.store.cachedPublic ||= await fetchMinecraftVersions())
    const publicLocals: PublicVersion[] = this.store.list.map(v => ({
      name: v.name,
      id: v.lastVersionId,
      providers: ['custom'],
    }))
    return [...publicVersions, ...publicLocals]
  }
}
