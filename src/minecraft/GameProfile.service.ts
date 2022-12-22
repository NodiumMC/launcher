import { makeAutoObservable } from 'mobx'
import { LauncherProfileJSON, LauncherProfiles, populate } from 'core'
import { join } from 'native/path'
import { exists, prepare, readJsonFile, writeJsonFile } from 'native/filesystem'
import { watch } from 'tauri-plugin-fs-watch-api'
import { fetchMinecraftVersions, Provider } from 'core/providers'
import { PublicVersion } from 'core/providers/types'
import { singleton } from 'tsyringe'
import { GeneralSettings } from 'settings/GeneralSettings.service'

@singleton()
export class GameProfileService {
  list: LauncherProfileJSON[] = []
  private _cachedPublic?: PublicVersion[]

  constructor(private readonly settings: GeneralSettings) {
    makeAutoObservable(this)
    void (async () => {
      watch(await this.pathToProfile(), {}, this.reloadProfiles.bind(this))
      await this.reloadProfiles()
    })()
  }

  private pathToProfile = async () => join(await this.settings.getGameDir(), 'launcher_profiles.json')

  async reloadProfiles() {
    const pathToProfiles = await this.pathToProfile()
    if (!(await exists(pathToProfiles))) {
      await this.createEmptyProfile()
      return
    }
    this.list = await readJsonFile<LauncherProfiles>(pathToProfiles).then(({ profiles }) => Object.values(profiles))
  }

  has(vid: string) {
    return !!this.list.find(v => v.lastVersionId === vid)
  }

  async create(provider: Provider, version: PublicVersion, vid: string, name: string, ...properties: string[]) {
    const clientDir = await prepare(join(await this.settings.getGameDir(), 'versions', vid))
    const jsonPath = join(clientDir, `${vid}.json`)
    const json = await provider(version.id, ...properties)
    await prepare(clientDir)
    await writeJsonFile(jsonPath, await populate(json))
    const profile: LauncherProfileJSON = {
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
    this.list.push(profile)
    const profiles = Object.fromEntries(this.list.map(v => [v.lastVersionId, v]))
    await writeJsonFile<LauncherProfiles>(await this.pathToProfile(), { profiles })
    return profile
  }

  private createEmptyProfile = async () =>
    writeJsonFile(await this.pathToProfile(), {
      profiles: {},
    })

  async fetchAllVersions(): Promise<PublicVersion[]> {
    const publicVersions = (this._cachedPublic ||= await fetchMinecraftVersions())
    const publicLocals: PublicVersion[] = this.list.map(v => ({
      name: v.name,
      id: v.lastVersionId,
      providers: ['custom'],
    }))
    return [...publicVersions, ...publicLocals]
  }
}
