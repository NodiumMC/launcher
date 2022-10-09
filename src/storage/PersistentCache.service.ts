import { BeforeResolve, Module } from 'mobmarch'
import { JSON5Config } from 'storage/JSON5Config'
import { Preloader } from 'preload'

@Module([Preloader])
export class PersistentCacheService extends JSON5Config {
  private async [BeforeResolve]() {
    await this.preloader.add('Loading persistent cache', this.load.bind(this))
  }

  constructor(private readonly preloader: Preloader) {
    super('cache')
  }
}
