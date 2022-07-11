import { singleton } from 'tsyringe'
import { makeObservable, observable } from 'mobx'
import { Storage } from '../filesystem/Storage.service'

@singleton()
export class LauncherConfig {
  @observable private _installed: boolean = false

  constructor(
    private readonly st: Storage,
  ) {
    makeObservable(this)
    st.onLoad(() => this._installed = this.st._.launcher.installed)
  }

  set installed(value: boolean) {
    this.st._.launcher.installed = value
    this._installed = value
  }

  get installed() {
    return this._installed
  }
}
