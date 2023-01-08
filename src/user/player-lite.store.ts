import { Service } from 'positron'
import { makeAutoObservable } from 'mobx'
import { sync } from 'storage'

@Service
export class PlayerLiteStore {
  local_nickname = 'Player'
  constructor() {
    makeAutoObservable(this)
    sync(this, 'local_nickname')
  }
}
