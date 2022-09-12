import { Module } from 'mobmarch'
import { action, computed, makeObservable, observable } from 'mobx'
import { Upfall } from '.'
import { nanoid } from 'nanoid'

@Module
export class UpfallService {
  @observable private _upfalls: Upfall[] = []

  @computed
  get list() {
    return this._upfalls
  }

  @action
  drop(
    type: Upfall['type'],
    content: Upfall['content'],
    icon?: Upfall['icon'],
  ) {
    const id = nanoid()
    this._upfalls.push({
      id,
      type,
      content,
      icon,
      remove: () => this._upfalls.removeIf(v => v.id === id),
    })
  }

  constructor() {
    makeObservable(this)
  }
}
