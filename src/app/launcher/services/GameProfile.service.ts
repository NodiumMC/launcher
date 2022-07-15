import { singleton } from 'tsyringe'
import { action, makeObservable, observable } from 'mobx'
import { LauncherProfiles } from '../profile/types'
import { locateProfiles } from '../profile/locate'
import { join } from '@tauri-apps/api/path'
import { GameDir } from '../../filesystem/utils'
import { readTextFile } from '@tauri-apps/api/fs'

@singleton()
export class GameProfileService {
  @observable private profiles: LauncherProfiles[] = []
  constructor() {
    makeObservable(this)
  }

  @action.bound
  async reloadProfiles() {
    const profileFiles = await locateProfiles(await join(await GameDir(), 'instances'))
    this.profiles = await profileFiles.mapAsync(async file => {
      const stringified = await readTextFile(file)
      return JSON.parse(stringified)
    })
  }
}
