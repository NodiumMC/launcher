import { makeAutoObservable } from 'mobx'
import { nanoid } from 'nanoid'
import type { IPopup } from '.'
import { singleton } from 'tsyringe'

@singleton()
export class PopupService {
  private _popups: Record<string, IPopup> = {}

  constructor() {
    makeAutoObservable(this)
  }

  get entries() {
    return this._popups
  }

  spawn(popup: Omit<IPopup, 'close'>) {
    const id = nanoid()
    this._popups[id] = { ...popup, close: () => this.close(id) }
  }

  close(id: string) {
    delete this._popups[id]
  }
}
