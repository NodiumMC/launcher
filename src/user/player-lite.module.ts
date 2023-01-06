import { Module } from 'positron'
import { PlayerLiteStore } from 'user/player-lite.store'

@Module
export class PlayerLiteModule {
  constructor(private readonly store: PlayerLiteStore) {}

  get nickname() {
    return this.store.local_nickname
  }

  set nickname(value: string) {
    this.store.local_nickname = value
  }

  get isValid() {
    return /^[\w-_]+?$/.test(this.store.local_nickname)
  }
}
