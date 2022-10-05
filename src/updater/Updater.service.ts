import { Preloader } from 'preload/Preloader.service'
import { I18n } from 'i18n/i18n.service'
import { updateApp } from 'updater/update'
import { BeforeResolve, Module } from 'mobmarch'
import { endTime } from 'debug'

@Module([I18n, Preloader])
export class Updater {
  private [BeforeResolve]() {
    return this.preloader.add(this.i18n.translate.loading.updating, updateApp).then(v => endTime('startup'))
  }

  constructor(private readonly preloader: Preloader, private readonly i18n: I18n) {}
}
