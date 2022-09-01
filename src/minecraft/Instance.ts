import { makeObservable, observable } from 'mobx'
import type { LoggingPool } from 'logging/LoggingPool.service'
import type { Logger } from 'logging'
import { VersionInstallService } from 'core/services/VersionInstall.service'
import { Observable } from 'rxjs'
import { map } from 'utils/map'
import { launch, LaunchOptions } from 'core'
import { join } from '@tauri-apps/api/path'
import { exists, GameDir } from 'native/filesystem'
import { Child } from '@tauri-apps/api/shell'
import { InstanceSettings } from 'minecraft/InstanceSettings'

export class Instance {
  private readonly loggerKey
  @observable private readonly logger: Logger
  @observable _installed = false
  private child?: Child

  constructor(
    public settings: InstanceSettings,
    private readonly loggingPool: LoggingPool,
    private readonly installer: VersionInstallService,
  ) {
    makeObservable(this)
    this.settings = settings
    this.loggerKey = Symbol(settings.name)
    this.logger = loggingPool!.request(this.loggerKey)
  }

  get isInstalled() {
    return this._installed
  }

  async install() {
    const progress = await this.installer?.install(this.settings.vid)
    if (!progress) throw new Error('Installer instance not exists')
    return new Observable<number>(o => {
      progress.on('download', data =>
        o.next(map(data.transferred, 0, data.total, 0, 100)),
      )
      progress.on('unzip', data =>
        o.next(map(data.progress, 0, data.total, 0, -50)),
      )
      progress.on('done', () => (o.complete(), (this._installed = true)))
      progress.on('error', o.error.bind(o))
    })
  }

  async launch(
    options: Omit<
      LaunchOptions,
      'clientDir' | 'gameDir' | 'gameDataDir' | 'vid' | keyof InstanceSettings
    >,
  ) {
    const clientDir = await join(await GameDir(), 'versions', this.settings.vid)
    if (!(await exists(clientDir)))
      throw new Error('No version is assigned to this instance')
    const gameDir = await join(await GameDir(), 'instances', this.settings.name)
    if (!(await exists(gameDir)))
      throw new Error('Instance is not exists')
    const command = await launch({
      ...options,
      ...this.settings,
      vid: this.settings.vid,
      clientDir,
      gameDir,
      gameDataDir: await GameDir(),
    })
    command.stdout.on('data', this.logger.log.bind(this.logger))
    command.stderr.on('data', this.logger.log.bind(this.logger))
    this.child = await command.spawn()
    return this.logger
  }

  async kill() {
    await this.child?.kill()
    this.child = undefined
  }

  get pid(){
    if(!this.child) throw new Error('Process ID cannot be retrieved until the instance is started')
    return this.child?.pid
  }

  get isRunning() {
    return !!this.child
  }
}
