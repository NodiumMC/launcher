import { Module } from 'mobmarch'
import { action, makeObservable, observable } from 'mobx'
import { MainScreenPage } from './types'

@Module
export class MainScreenSubRouter {
  @observable
  location: MainScreenPage = MainScreenPage.PLAY
  constructor() {
    makeObservable(this)
  }

  @action.bound
  locate(to: MainScreenPage) {
    this.location = to
  }
}
