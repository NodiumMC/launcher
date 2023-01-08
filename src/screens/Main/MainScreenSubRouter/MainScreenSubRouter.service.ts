import { makeAutoObservable } from 'mobx'
import { MainScreenPage } from './types'
import { Module } from 'positron'

@Module
export class MainScreenSubRouter {
  location: MainScreenPage = MainScreenPage.PLAY

  constructor() {
    makeAutoObservable(this)
  }

  locate(to: MainScreenPage) {
    this.location = to
  }
}
