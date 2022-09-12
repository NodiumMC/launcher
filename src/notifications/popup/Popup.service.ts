import { action, makeObservable, observable } from 'mobx'
import { nanoid } from 'nanoid'
import { Module } from 'mobmarch'
import type { IPopup } from '.'

@Module
export class PopupService {
  @observable private _popups: Record<string, IPopup> = {}
  constructor() {
    makeObservable(this)
  }

  get entries() {
    return this._popups
  }

  @action.bound
  spawn(popup: Omit<IPopup, 'close'>) {
    const id = nanoid()
    this._popups[id] = { ...popup, close: () => this.close(id) }
  }

  @action.bound
  close(id: string) {
    delete this._popups[id]
  }
}
