import { singleton } from 'tsyringe'
import { autorun, makeAutoObservable } from 'mobx'
import { main } from 'storage'

@singleton()
export class PlayerLiteService {
  nickname = 'Player'
  constructor() {
    makeAutoObservable(this)
    autorun(() => {
      main.setItem('local_nickname', this.nickname)
    })
    main.getItem<string>('local_nickname').then(n => (this.nickname = n ?? 'Player'))
  }

  get isValid() {
    return /^[\w-_]+?$/.test(this.nickname)
  }
}
