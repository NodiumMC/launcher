import { Service } from 'positron'
import { Upfall } from './upfall.types'
import { makeAutoObservable } from 'mobx'

@Service
export class UpfallStore {
  upfalls: Upfall[] = []

  constructor() {
    makeAutoObservable(this)
  }

  add(id: Upfall['id'], type: Upfall['type'], content: Upfall['content'], icon: Upfall['icon']) {
    this.upfalls.push({ id, type, content, icon, remove: () => this.remove(id) })
  }

  remove(id: string) {
    this.upfalls.removeIf(v => v.id === id)
  }
}
