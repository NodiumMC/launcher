import { action, makeObservable, observable } from 'mobx'
import { LauncherProfiles } from 'core'
import { join } from '@tauri-apps/api/path'
import { exists, GameDir, readJsonFile, writeJsonFile } from 'native/filesystem'
import { Initable, Module } from 'mobmarch'
import { watch } from 'tauri-plugin-fs-watch-api'
import { Fastore } from 'interfaces/Fastore'
import { LauncherProfile } from 'minecraft/LauncherProfile'
import { BlakeMapService } from 'core/services/BlakeMap.service'

@Module([BlakeMapService])
export class GameProfileService implements Initable, Fastore<LauncherProfile> {
  @observable list: LauncherProfile[] = []

  async init() {
    watch(await this.pathToProfile(), {}, this.reloadProfiles.bind(this))
    return this.reloadProfiles()
  }

  constructor(private readonly blake: BlakeMapService) {
    makeObservable(this)
  }

  private pathToProfile = async () =>
    await join(await GameDir(), 'launcher_profiles.json')

  @action.bound
  async reloadProfiles() {
    const pathToProfiles = await this.pathToProfile()
    if (!(await exists(pathToProfiles))) {
      await this.createEmptyProfile()
      return
    }
    const profileOptions = await readJsonFile<LauncherProfiles>(
      pathToProfiles,
    ).then(({ profiles }) => Object.values(profiles))
    this.list = profileOptions.map(o => new LauncherProfile(o, this.blake))
  }

  New() {
    // TODO:
  }

  private createEmptyProfile = async () =>
    writeJsonFile(await this.pathToProfile(), {
      profiles: {},
    })
}
