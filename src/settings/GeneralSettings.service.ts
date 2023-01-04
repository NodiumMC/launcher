import { singleton } from 'tsyringe'
import { makeAutoObservable } from 'mobx'
import { GAME_DIR } from 'native/filesystem'
import { main } from 'storage'

@singleton()
export class GeneralSettings {
  private _gameDir: string | null = null

  constructor() {
    makeAutoObservable(this)
    main.getItem<string>('gameDir').then(dir => {
      this.gameDir = dir ?? GAME_DIR
    })
  }

  get gameDir(): string {
    return this._gameDir ?? GAME_DIR
  }

  set gameDir(value: string | null) {
    this._gameDir = value
    main.setItem('gameDir', value)
  }
}
