import { singleton } from 'tsyringe'
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'
import { Preloader } from '../preload/Preloader.service'
import { I18n } from '../i18n/i18n.service'
import { TODO } from 'utils/todo'

@singleton()
export class Updater {
  constructor(
    private readonly preloader: Preloader,
    private readonly i18n: I18n,
  ) {}

  update() {
    this.preloader.add(this.i18n.$('loading.updating'), async () => {
      try {
        const { shouldUpdate } = await checkUpdate()
        if (shouldUpdate) {
          await installUpdate()
          await relaunch()
        }
      } catch (e) {
        TODO()
      }
    })
  }
}
