import { makeAutoObservable } from 'mobx'
import { Upfall } from '.'
import { nanoid } from 'nanoid'
import { I18n, R18T } from 'i18n'
import { singleton } from 'tsyringe'

@singleton()
export class UpfallService {
  private _upfalls: Upfall[] = []

  get list() {
    return this._upfalls
  }

  drop(type: Upfall['type'], content: string | R18T, icon?: Upfall['icon']) {
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
    makeAutoObservable(this)
  }
}
