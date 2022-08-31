import { action, makeObservable, observable } from 'mobx'
import { LauncherProfile, LauncherProfiles } from 'core'
import { join } from '@tauri-apps/api/path'
import { exists, GameDir, readJsonFile, writeJsonFile } from 'native/filesystem'
import { Initable, Module } from 'mobmarch'
import { watch } from 'tauri-plugin-fs-watch-api'

@Module
export class GameProfileService implements Initable {
  @observable private _profiles: LauncherProfile[] = []

  async init() {
    watch(await this.pathToProfile(), {}, this.reloadProfiles.bind(this))
    return this.reloadProfiles()
  }

  constructor() {
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
    this._profiles = await readJsonFile<LauncherProfiles>(pathToProfiles).then(
      res => Object.values(res.profiles),
    )
  }

  private createEmptyProfile = async () =>
    writeJsonFile(await this.pathToProfile(), {
      profiles: {},
    })

  get profiles() {
    return this._profiles
  }
}
