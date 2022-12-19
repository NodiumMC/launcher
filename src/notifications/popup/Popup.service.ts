import { makeAutoObservable } from 'mobx'
import { singleton } from 'tsyringe'
import { FC } from 'react'
import { nanoid } from 'nanoid'

@singleton()
export class PopupService {
  private _popups: Record<string, [FC<any>, any]> = {}

  constructor() {
    makeAutoObservable(this)
  }

  get entries() {
    return this._popups
  }

  create<T extends object>(template: FC<T>, props: T): void {
    const idx = nanoid()
    this._popups[idx] = [template, { ...props, idx }]
  }

  close(id: string) {
    delete this._popups[id]
  }
}
