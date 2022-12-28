import { Preloader } from 'preload/Preloader.service'
import { I18n } from 'i18n'
import { updateApp } from 'updater/update'
import { endTime } from 'debug'
import { singleton } from 'tsyringe'

@singleton()
export class Updater {
  constructor(private readonly preloader: Preloader, private readonly i18n: I18n) {
    this.preloader.add(this.i18n.translate.preload.updating, updateApp).then(() => endTime('startup'))
  }
}
