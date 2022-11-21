import { Module } from 'mobmarch'
import { Vanilla } from 'core/providers/implemented/vanilla'
import { Fabric } from 'core/providers/implemented/fabric'
import { BlakeMapService } from 'minecraft/BlakeMap.service'
import type { SupportedProviders } from 'core/providers'
import { join } from 'native/path'
import { GameDir, prepare } from 'native/filesystem'
import { install, launch } from 'core'
import { makeAutoObservable } from 'mobx'
import { UpfallService } from 'notifications'
import { GameProfileService } from 'minecraft/GameProfile.service'
import { Observable } from 'rxjs'
import { VersionUnion } from 'core/providers/types'

@Module([GameProfileService, BlakeMapService, UpfallService])
export class SimpleHandler {
  readonly vanilla = new Vanilla()
  readonly fabric = new Fabric()

  provider: SupportedProviders = 'vanilla'
  version: VersionUnion | null = null

  constructor(
    private readonly gp: GameProfileService,
    private readonly blake: BlakeMapService,
    private readonly upfall: UpfallService,
  ) {
    makeAutoObservable(this)
  }

  async versions() {
    return this[this.provider].versions()
  }

  go(username: string) {
    return new Observable<{ progress?: number; done?: boolean }>(subscriber => {
      let launched = false
      void (async () => {
        const versionId = `${this.provider}-${this.version!.id}`
        const clientDir = await prepare(join(await GameDir(), 'versions', versionId))
        const lnch = async () => {
          if (launched) return
          launched = true
          const l = await launch({
            vid: versionId,
            gameDataDir: await GameDir(),
            gameDir: await prepare(join(await GameDir(), 'main')),
            username,
            clientDir,
          })
          l.on('error', e => {
            this.upfall.drop('error', `Процесс завершился с ошибкой: ${e}`)
            subscriber.next({ done: true })
          })
          let notify = false
          l.stdout.on('data', e => {
            if (!notify && e?.includes?.('Backend library: LWJGL version')) {
              notify = true
              this.upfall.drop('ok', 'Клиент запущен')
              subscriber.next({ done: true })
            }
          })
          await l.spawn()
        }
        if (!this.gp.has(versionId)) {
          await this.gp.create(this[this.provider], this.version!, versionId, `${this.provider} ${this.version!.id}`)
          const installer = await install({
            vid: versionId!,
            blakemap: this.blake.map,
            clientDir,
            gameDataDir: await GameDir(),
          })
          installer.on('download', e => subscriber.next({ progress: e.transferred.map(0, e.total, 0, 100) }))
          installer.on('error', e => {
            this.blake.save()
            this.upfall.drop(
              'error',
              'Во время установки произошла ошибка. Проверьте подключение к интернету и свободное пространство на диске',
            )
            subscriber.next({ done: true })
          })
          installer.on('done', () => {
            this.blake.save()
            lnch()
          })
        } else lnch()
      })()
    })
  }
}
