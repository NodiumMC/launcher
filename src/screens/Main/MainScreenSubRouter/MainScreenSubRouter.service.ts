import { makeAutoObservable } from 'mobx'
import { MainScreenPage } from './types'
import { singleton } from 'tsyringe'

@singleton()
export class MainScreenSubRouter {
  location: MainScreenPage = MainScreenPage.PLAY

  constructor() {
    makeAutoObservable(this)
  }

  locate(to: MainScreenPage) {
    this.location = to
  }
}
