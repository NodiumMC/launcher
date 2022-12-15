import { singleton } from 'tsyringe'
import { makeAutoObservable } from 'mobx'
import { GameDir } from 'native/filesystem'
import { main } from 'storage'

@singleton()
export class GeneralSettings {
  private _gameDir: string | null = null

  constructor() {
    makeAutoObservable(this)
    main.getItem<string>('gameDir').then(dir => {
      if (dir) this.gameDir = dir
      else GameDir().then(dir => (this.gameDir = dir))
    })
  }

  get gameDir() {
    return this._gameDir
  }

  set gameDir(value: string | null) {
    this._gameDir = value
    main.setItem('gameDir', value)
  }

  async getGameDir() {
    return this._gameDir ?? (await GameDir())
  }
}
