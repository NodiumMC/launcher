import { singleton } from 'tsyringe'
import { makeAutoObservable } from 'mobx'
import { sync } from 'storage'

@singleton()
export class PlayerLiteService {
  nickname = 'Player'
  constructor() {
    makeAutoObservable(this)
    sync(this, 'nickname', 'local_nickname')
  }

  get isValid() {
    return /^[\w-_]+?$/.test(this.nickname)
  }
}
