import { loadStorages } from 'storage'
import { Preloader } from 'preload/Preloader.service'
import { singleton } from 'tsyringe'

@singleton()
export class WaitService {
  constructor(private readonly preloader: Preloader) {
    this.preloader.add('Loading', () => Promise.all([loadStorages]))
  }
}
