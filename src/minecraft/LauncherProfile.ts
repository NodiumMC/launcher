import { install } from 'core'
import type { LauncherProfileJSON } from 'core'
import { makeObservable, observable } from 'mobx'
import { BlakeMapService } from 'core/services/BlakeMap.service'
import { join } from '@tauri-apps/api/path'
import { exists, GameDir } from 'native/filesystem'

enum ProfileState {
  EMPTY,
  INSTALLING,
  READY,
}

export class LauncherProfile {
  @observable options: LauncherProfileJSON
  @observable private _progress: number = 0
  @observable private _state: ProfileState = ProfileState.EMPTY

  constructor(
    options: LauncherProfileJSON,
    private readonly blake: BlakeMapService,
  ) {
    this.options = options
    makeObservable(this)
  }

  private async _install(clientDir: string, gameDataDir: string) {
    const vid = this.options.lastVersionId
    await this.blake.load()
    const inp = await install({
      clientDir,
      gameDataDir,
      blakemap: this.blake.map,
      vid,
    })
    this._state = ProfileState.INSTALLING
    inp.on('unit', (name, hash) => (this.blake.map[name] = hash))
    inp.on('download', progress => progress.transferred.map(0, progress.total))
    inp.on('unzip', progress =>
      progress.progress.map(0, progress.total, 100, 200),
    )
    inp.on('done', async () => {
      await this.blake.save()
      this._state = ProfileState.READY
      this._progress = 0
    })
    // inp.on(
    //   'error',
    //   e => (
    //     (this._state = ProfileState.MALFORMED),
    //     (this._malformationCause = e.message)
    //   ),
    // )
  }

  get progress() {
    return this._progress
  }

  get state() {
    return this._state
  }

  async install() {
    const vid = this.options.lastVersionId
    const vpath = await join(await GameDir(), 'versions', vid)
    if (!(await exists(vpath))) throw new Error(`There is no version ${vid}`)
    return this._install(vpath, await GameDir())
  }
}
