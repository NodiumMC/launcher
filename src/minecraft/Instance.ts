import { makeObservable, observable } from 'mobx'
import type { LauncherProfiles } from 'core/profile/types'
import { LoggingPool } from 'logging/LoggingPool.service'

export class Instance {
  private readonly loggerKey
  @observable name: string
  @observable readonly launcherProfiles: LauncherProfiles
  @observable private _isRunning = false
  @observable private logger
  @observable selectedProfile: string

  constructor(
    name: string,
    launcherProfiles: LauncherProfiles,
    private readonly loggingPool: LoggingPool,
    selectedProfile?: string,
  ) {
    makeObservable(this)
    this.name = name
    this.launcherProfiles = launcherProfiles
    this.loggerKey = Symbol(name)
    this.logger = loggingPool.request(this.loggerKey)
    this.selectedProfile =
      selectedProfile ?? Object.keys(launcherProfiles.profiles)[0]
  }
}
