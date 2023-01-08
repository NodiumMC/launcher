import { Module } from 'positron'
import { GameProfileService } from './game-profile.service'
import { Provider } from 'core/providers'
import { PublicVersion } from 'core/providers/types'
import { GameProfileStore } from './game-profile.store'
import { w } from 'debug'

@Module
export class GameProfileModule {
  constructor(private readonly service: GameProfileService, private readonly store: GameProfileStore) {}

  async create(provider: Provider, version: PublicVersion, vid: string, name: string, ...properties: string[]) {
    return this.service.create(provider, version, vid, name, ...properties)
  }

  fetchAllVersions() {
    return this.service.fetchAllVersions()
  }

  has(vid: string) {
    return this.store.has(vid)
  }

  find(id: string) {
    return this.store.find(id)
  }
}
