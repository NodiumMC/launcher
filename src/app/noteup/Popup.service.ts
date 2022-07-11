import { singleton } from 'tsyringe'
import { action, makeObservable, observable } from 'mobx'
import { nanoid } from 'nanoid'
import { PopupBase, wrap } from '../../blocks/popup/PopupBase'

@singleton()
export class PopupService {
  @observable private _popups: Record<string, JSX.Element> = {}
  constructor() {
    makeObservable(this)
  }

  get popups() {
    return this._popups
  }

  @action.bound
  spawn(element: JSX.Element) {
    const id = nanoid()
    this._popups[id] = wrap(element, () => this.close(id))
  }

  @action.bound
  close(id: string) {
    delete this._popups[id]
  }
}
