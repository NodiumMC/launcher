import { makeObservable, observable } from 'mobx'
import type { LoggingPool } from 'logging/LoggingPool.service'
import type { Logger } from 'logging'
import { launch, LaunchOptions } from 'core'
import { join } from 'native/path'
import { exists, GameDir } from 'native/filesystem'
import { Child } from '@tauri-apps/api/shell'
import type { InstanceSettings } from 'minecraft/InstanceSettings'

export class Instance {
  private readonly loggerKey
  @observable private readonly logger: Logger
  @observable readonly settings: InstanceSettings
  private child?: Child

  constructor(settings: InstanceSettings, private readonly loggingPool: LoggingPool) {
    makeObservable(this)
    this.settings = settings
    this.loggerKey = Symbol(settings.name)
    this.logger = loggingPool.request(this.loggerKey)
  }

  async launch(options: Omit<LaunchOptions, 'clientDir' | 'gameDir' | 'gameDataDir' | 'vid' | keyof InstanceSettings>) {
    const clientDir = join(await GameDir(), 'versions', this.settings.vid)
    if (!(await exists(clientDir))) throw new Error('No version is assigned to this instance')
    const gameDir = join(await GameDir(), 'instances', this.settings.name)
    if (!(await exists(gameDir))) throw new Error('Instance is not exists')
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

  get pid() {
    if (!this.child) throw new Error('Process ID cannot be retrieved until the instance is started')
    return this.child?.pid
  }

  get isRunning() {
    return !!this.child
  }

  get asJson() {
    return { ...this.settings }
  }
}
