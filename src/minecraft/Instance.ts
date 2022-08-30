import { makeObservable, observable } from 'mobx'
import type { LoggingPool } from 'logging/LoggingPool.service'
import { autoInjectable } from 'tsyringe'
import type { Logger } from 'logging'
import { VersionInstallService } from 'core/services/VersionInstall.service'
import { Observable } from 'rxjs'
import { map } from 'utils/map'
import { launch, LaunchOptions } from 'core'
import { join } from '@tauri-apps/api/path'
import { GameDir } from 'native/filesystem'

export class Instance {
  private readonly loggerKey
  @observable name: string
  @observable private currentId?: string
  @observable private logger: Logger
  @observable _installed = false

  constructor(
    name: string,
    currentId: string,
    private readonly loggingPool: LoggingPool,
    private readonly installer: VersionInstallService,
  ) {
    makeObservable(this)
    this.name = name
    this.loggerKey = Symbol(name)
    this.logger = loggingPool!.request(this.loggerKey)
    this.currentId = currentId
  }

  get isInstalled() {
    return this._installed
  }

  async install() {
    if(!this.currentId) throw new Error('No version is assigned to this instance')
    const progress = await this.installer?.install(this.currentId)
    if(!progress) throw new Error('Installer instance not exists')
    return new Observable<number>(o => {
      progress.on('download', data => o.next(map(data.transferred, 0, data.total, 0, 100)))
      progress.on('unzip', data => o.next(map(data.progress, 0, data.total, 0, -50)))
      progress.on('done', () => (o.complete(), this._installed = true))
      progress.on('error', o.error.bind(o))
    })
  }

  async launch(options: Omit<LaunchOptions, 'clientDir' | 'gameDir' | 'gameDataDir' | 'vid'>) {
    if(!this.currentId) throw new Error('No version is assigned to this instance')
    const command = await launch({
      ...options,
      vid: this.currentId,
      clientDir: await join(await GameDir(), 'versions', this.currentId),
      gameDir: await join(await GameDir(), 'instances', this.name),
      gameDataDir: await GameDir()
    })
    command.stdout.on('data', this.logger.log.bind(this.logger))
    command.stderr.on('data', this.logger.log.bind(this.logger))
    const child = await command.spawn()
    return this.logger
  }
}
