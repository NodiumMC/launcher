import { Service } from 'positron'
import { FC } from 'react'
import { makeAutoObservable } from 'mobx'

type PopupComponent = [FC<any>, any]

@Service
export class PopupStore {
  popups: Record<string, PopupComponent> = {}

  constructor() {
    makeAutoObservable(this)
  }

  add(idx: string, component: PopupComponent) {
    this.popups[idx] = component
  }

  remove(idx: string) {
    delete this.popups[idx]
  }
}
