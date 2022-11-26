import { action, makeObservable, observable } from 'mobx'
import { LauncherProfileJSON, LauncherProfiles, populate } from 'core'
import { join } from 'native/path'
import { exists, GameDir, prepare, readJsonFile, writeJsonFile } from 'native/filesystem'
import { BeforeResolve, Module } from 'mobmarch'
import { watch } from 'tauri-plugin-fs-watch-api'
import { Provider } from 'core/providers'
import { VersionUnion } from 'core/providers/types'
import { CentralConfig } from 'storage'

@Module([CentralConfig])
export class GameProfileService {
  @observable public list: LauncherProfileJSON[] = []

  private async [BeforeResolve]() {
    watch(await this.pathToProfile(), {}, this.reloadProfiles.bind(this))
    await this.reloadProfiles()
  }

  constructor(private readonly cc: CentralConfig) {
    makeObservable(this)
  }

  private pathToProfile = async () => join(this.cc.get('main.gameDir', await GameDir()), 'launcher_profiles.json')

  @action
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

  async create(provider: Provider, version: VersionUnion, vid: string, name: string, ...properties: string[]) {
    const clientDir = await prepare(join(this.cc.get('main.gameDir', await GameDir()), 'versions', vid))
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
}
