import type { SupportedProviders } from 'core/providers'
import { fetchMinecraftVersions } from 'core/providers'
import { join } from 'native/path'
import { prepare } from 'native/filesystem'
import { makeAutoObservable } from 'mobx'
import { UpfallService } from 'notifications'
import { GameProfileService } from 'minecraft/GameProfile.service'
import { Observable } from 'rxjs'
import { VersionUnion } from 'core/providers/types'
import * as providers from 'core/providers/implemented'
import { compileLocal, launch, unzipNatives } from 'core'
import { batchDownload } from 'network'
import { MinecraftJournal } from 'minecraft/MinecraftJournal.service'
import { main } from 'storage'
import { singleton } from 'tsyringe'
import { GeneralSettings } from 'settings/GeneralSettings.service'

@singleton()
export class SimpleHandler {
  provider: SupportedProviders = 'vanilla'
  version: VersionUnion | null = null

  constructor(
    private readonly gp: GameProfileService,
    private readonly upfall: UpfallService,
    private readonly journal: MinecraftJournal,
    private readonly settings: GeneralSettings,
  ) {
    makeAutoObservable(this)
  }

  async versions() {
    return fetchMinecraftVersions()
  }

  go(username: string) {
    return new Observable<{ progress?: number; done?: boolean }>(subscriber => {
      let launched = false
      void (async () => {
        const gameDir = await this.settings.getGameDir()
        const versionId = `${this.provider}-${this.version!.id}`
        const clientDir = await prepare(join(gameDir, 'versions', versionId))
        const lnch = async () => {
          if (launched) return
          launched = true
          const l = await launch({
            vid: versionId,
            gameDataDir: gameDir,
            gameDir: await prepare(join(gameDir, 'main')),
            username,
            clientDir,
          })
          l.on('error', e => {
            this.upfall.drop('error', `Процесс завершился с ошибкой: ${e}`)
            subscriber.next({ done: true })
          })
          let notify = false
          l.stdout.on('data', e => {
            this.journal.write(e)
            if (!notify && e?.includes?.('Backend library: LWJGL version')) {
              notify = true
              this.upfall.drop('ok', 'Клиент запущен')
              subscriber.next({ done: true })
            }
          })
          l.stderr.on('data', data => this.journal.write(data))
          await l.spawn()
        }
        if (!this.gp.has(versionId)) {
          await this.gp.create(
            providers[this.provider as keyof typeof providers],
            this.version!,
            versionId,
            `${this.provider} ${this.version!.id}`,
          )
          const installer = batchDownload(await compileLocal(versionId, clientDir, gameDir))
          installer.subscribe({
            next(data) {
              subscriber.next({ progress: data.progress.map(0, data.total, 0, 100) })
            },
            complete: async () => {
              unzipNatives(join(clientDir, 'natives')).subscribe({
                complete() {
                  lnch()
                },
                error: () => {
                  this.upfall.drop('error', 'Не удалось распаковать некоторые файлы игры')
                },
              })
            },
            error: () => {
              this.upfall.drop(
                'error',
                'Во время установки произошла ошибка. Проверьте подключение к интернету и свободное пространство на диске',
              )
              subscriber.next({ done: true })
            },
          })
        } else
          lnch().catch(e => {
            this.upfall.drop('error', `Запуск игры не удался: ${e}`)
            subscriber.next({ done: true })
          })
      })()
    })
  }
}
