import { BeforeResolve, Module } from 'mobmarch'
import { loadStorages } from 'storage'
import { Preloader } from 'preload/Preloader.service'

@Module([Preloader])
export class WaitService {
  private async [BeforeResolve]() {
    return this.preloader.add('Loading', () => Promise.all([loadStorages]))
  }

  constructor(private readonly preloader: Preloader) {}
}
