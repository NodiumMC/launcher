import { Module } from 'mobmarch'
import { action, computed, makeObservable, observable } from 'mobx'
import { Upfall } from '.'
import { nanoid } from 'nanoid'
import { I18n } from 'i18n'

@Module([I18n])
export class UpfallService {
  @observable private _upfalls: Upfall[] = []

  @computed
  get list() {
    return this._upfalls
  }

  @action
  drop(type: Upfall['type'], content: string, icon?: Upfall['icon']) {
    const id = nanoid()
    this._upfalls.push({
      id,
      type,
      content: this.i18n.resolve(content),
      icon,
      remove: () => this._upfalls.removeIf(v => v.id === id),
    })
  }

  constructor(private readonly i18n: I18n) {
    makeObservable(this)
  }
}
