import { I18nModule } from 'i18n'
import { updateApp } from './update'
import { endTime } from 'debug'
import { PreloaderModule } from 'preload'
import { Module } from 'positron'

@Module
export class UpdaterModule {
  constructor(private readonly preloader: PreloaderModule, private readonly i18n: I18nModule) {
    this.preloader.spawn(this.i18n.translate.preload.updating, updateApp).then(() => endTime('startup'))
  }
}
