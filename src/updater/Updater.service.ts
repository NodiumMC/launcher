import { Preloader } from 'preload/Preloader.service'
import { I18n } from 'i18n/i18n.service'
import { updateApp } from 'updater/update'
import { Initable, Module } from 'mobmarch'

@Module([I18n, Preloader])
export class Updater implements Initable {
  init() {
    console.log('Updates')
    return this.preloader.add(this.i18n.translate.loading.updating, updateApp)
  }

  constructor(
    private readonly preloader: Preloader,
    private readonly i18n: I18n,
  ) {}
}
