import { Module } from 'mobmarch'
import { makeAutoObservable } from 'mobx'
import { fetch } from '@tauri-apps/api/http'
import EventEmitter from 'eventemitter3'

export interface NetworkCheckerEvents {
  available: () => void
}

@Module
export class NetworkChecker {
  private _available = true
  private pings: number[] = [0]
  readonly events = new EventEmitter<NetworkCheckerEvents>()

  update(value = true) {
    this._available = value
    if (value) this.events.emit('available')
  }

  get available() {
    return this._available
  }

  get lastPing() {
    return this.pings.last
  }

  get avgPing() {
    return this.pings.reduce((a, c) => a + c, 0) / this.pings.length
  }

  constructor() {
    makeAutoObservable(this)
    setInterval(() => {
      const start = performance.now()
      fetch('https://resources.download.minecraft.net/00/', { method: 'GET', timeout: 5000 }).then(
        response => {
          if (response.status === 200) {
            this.update(true)
            this.pings.push(performance.now() - start)
            if (this.pings.length > 20) this.pings.shift()
          } else this.update(false)
        },
        () => this.update(false),
      )
    }, 5000)
  }
}
