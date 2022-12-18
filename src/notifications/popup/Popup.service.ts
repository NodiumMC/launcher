import { makeAutoObservable } from 'mobx'
import { nanoid } from 'nanoid'
import { singleton } from 'tsyringe'
import { ReactElement } from 'react'

@singleton()
export class PopupService {
  private _popups: Record<string, ReactElement> = {}

  constructor() {
    makeAutoObservable(this)
  }

  get entries() {
    return this._popups
  }

  create(popup: (close: () => void) => ReactElement) {
    const id = nanoid()
    this._popups[id] = popup(() => this.close(id))
  }

  close(id: string) {
    delete this._popups[id]
  }
}
