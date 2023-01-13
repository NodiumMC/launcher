import { sync } from 'storage'
import { makeAutoObservable } from 'mobx'
import { Service } from 'positron'

@Service
export class HttpStore {
  access: string | null = null
  refresh: string | null = null
  constructor() {
    makeAutoObservable(this)
    sync(this, 'refresh')
  }
}
