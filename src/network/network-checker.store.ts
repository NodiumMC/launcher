import { Service } from 'positron'
import EventEmitter from 'eventemitter3'
import { makeAutoObservable } from 'mobx'
import { NetworkCheckerEvents } from './network-checker.types'

@Service
export class NetworkCheckerStore {
  available = true
  pings: number[] = [0]
  events = new EventEmitter<NetworkCheckerEvents>()

  constructor() {
    makeAutoObservable(this)
  }

  add(ping: number) {
    this.pings.push(ping)
    if (this.pings.length > 10) this.pings.shift()
  }
}
