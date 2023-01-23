import { Service } from 'positron'
import { LauncherProfileJSON, LauncherProfiles } from 'core'
import { autorun, makeAutoObservable } from 'mobx'
import { watch } from 'tauri-plugin-fs-watch-api'
import { exists, readJsonFile, writeJsonFile } from 'native/filesystem'
import { GameProfileCommon } from 'minecraft/game-profile/game-profile.common'
import { l } from 'utils'

@Service
export class GameProfileStore {
  list: LauncherProfileJSON[] = []
  loaded = false

  constructor(private readonly common: GameProfileCommon) {
    makeAutoObservable(this)
    l(async () => {
      watch(this.common.pathToProfile, {}, this.reloadProfiles.bind(this))
      await this.reloadProfiles()
      this.loaded = true
    })
    autorun(() => {
      if (!this.loaded) return
      const profiles = this.toProfiles()
      writeJsonFile<LauncherProfiles>(this.common.pathToProfile, { profiles })
    })
  }

  async reloadProfiles() {
    const pathToProfiles = this.common.pathToProfile
    if (!(await exists(pathToProfiles))) {
      await this.createEmptyProfile()
      return
    }
    this.list = await readJsonFile<LauncherProfiles>(pathToProfiles).then(({ profiles }) => Object.values(profiles))
  }

  has(vid: string) {
    return !!this.list.find(v => v.lastVersionId === vid)
  }

  private createEmptyProfile = async () =>
    writeJsonFile(this.common.pathToProfile, {
      profiles: {},
    })

  toProfiles() {
    return Object.fromEntries(this.list.map(v => [v.lastVersionId, v]))
  }

  add(profile: LauncherProfileJSON) {
    this.list.push(profile)
  }

  remove(id: string) {
    this.list.removeIf(v => v.lastVersionId === id)
  }

  find(id: string) {
    return this.list.find(v => v.lastVersionId === id)
  }
}
