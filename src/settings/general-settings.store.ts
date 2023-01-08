import { Service } from 'positron'
import { makeAutoObservable } from 'mobx'
import { sync } from 'storage'
import { GAME_DIR } from 'native/filesystem'

@Service
export class GeneralSettingsStore {
  gameDir: string = GAME_DIR

  constructor() {
    makeAutoObservable(this)
    sync(this, 'gameDir')
  }
}
