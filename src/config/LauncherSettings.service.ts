import { makeObservable, observable } from 'mobx'
import { Module } from 'mobmarch'
import { CentralConfig } from 'config'

@Module([CentralConfig])
export class LauncherConfig {
  @observable private _installed = false

  constructor(private readonly cc: CentralConfig) {
    makeObservable(this)
    this._installed = this.cc.data.launcher.installed
  }

  set installed(value: boolean) {
    this.cc.data.launcher.installed = value
    this._installed = value
  }

  get installed() {
    return this._installed
  }
}
