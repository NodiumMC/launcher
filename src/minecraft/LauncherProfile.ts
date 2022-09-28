import type { LauncherProfileJSON } from 'core'
import { install } from 'core'
import { action, makeObservable, observable, runInAction } from 'mobx'
import { BlakeMapService } from 'core/services/BlakeMap.service'
import { join } from 'native/path'
import { exists, GameDir } from 'native/filesystem'

enum ProfileState {
  EMPTY,
  INSTALLING,
  READY,
}

export class LauncherProfile {
  @observable options: LauncherProfileJSON
  @observable private _progress = 0
  @observable private _state: ProfileState = ProfileState.EMPTY
  @observable private abortController = new AbortController()

  constructor(
    options: LauncherProfileJSON,
    private readonly blake: BlakeMapService,
  ) {
    this.options = options
    makeObservable(this)
  }

  @action
  private async _install(clientDir: string, gameDataDir: string) {
    return new Promise<void>(async (resolve, reject) => {
      const vid = this.options.lastVersionId
      const inp = await install(
        {
          clientDir,
          gameDataDir,
          blakemap: this.blake.map,
          vid,
        },
        this.abortController.signal,
      )
      this._state = ProfileState.INSTALLING
      inp.on('unit', (name, hash) => {
        this.blake.map[name] = hash
      })
      inp.on('download', progress => {
        this._progress = progress.transferred.map(0, progress.total)
      })
      inp.on('unzip', progress => {
        this._progress = progress.progress.map(0, progress.total, 100, 200)
      })
      inp.on('done', async () => {
        await this.blake.save()
        this._state = ProfileState.READY
        this._progress = 0
        resolve()
      })
      inp.on('error', reject)
    })
  }

  get progress() {
    return this._progress
  }

  get state() {
    return this._state
  }

  @action
  async install() {
    const vid = this.options.lastVersionId
    const vpath = join(await GameDir(), 'versions', vid)
    if (!(await exists(vpath))) throw new Error(`There is no version ${vid}`)
    return this._install(vpath, await GameDir())
  }

  abort() {
    this.abortController.abort()
  }
}
