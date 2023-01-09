import { I18nModule } from 'i18n'
import { endTime, error, log } from 'debug'
import { PreloaderModule } from 'preload'
import { Module } from 'positron'
import { Popup, PopupModule } from 'notifications'
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater'
import { exit, relaunch } from '@tauri-apps/api/process'
import { promise } from 'utils'
import { parse } from 'markdown'

@Module
export class UpdaterModule {
  constructor(
    private readonly preloader: PreloaderModule,
    private readonly i18n: I18nModule,
    private readonly popup: PopupModule,
  ) {
    this.preloader.spawn(this.i18n.translate.preload.updating, this.update.bind(this)).then(() => endTime('startup'))
  }

  private async update() {
    return promise(async r => {
      try {
        const { shouldUpdate, manifest } = await checkUpdate()
        log('Update manifest:', manifest)
        if (shouldUpdate) {
          this.popup.create(Popup, {
            level: 'info',
            title: this.i18n.translate.update.available.explain({ version: manifest!.version }),
            description: await parse(manifest!.body).then(v => v.result),
            actions: [
              {
                label: this.i18n.translate.update.do,
                isPrimary: true,
                action: async close => {
                  close()
                  await installUpdate()
                  await relaunch()
                  r()
                },
              },
              {
                label: this.i18n.translate.update.cancel,
                action: () => exit(),
              },
            ],
          })
        }
      } catch (e) {
        error(`Failed to check update: ${e}`)
      }
    })
  }
}
