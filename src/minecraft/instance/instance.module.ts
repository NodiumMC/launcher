import { DynamicModule } from 'positron'
import { InstanceLocal } from './instance.local'
import { InstanceCommon } from './instance.common'
import { InstanceTracker } from './instance.tracker'
import { InstanceProfile } from './instance.profile'
import { InstanceInstaller } from './instance.installer'
import { InstanceLogging } from './instance.logging'
import { InstanceLauncher } from './instance.launcher'
import { InstanceLocalType } from './instance.types'
import { computed, makeObservable, observable } from 'mobx'

@DynamicModule
export class InstanceModule {
  static dyn() {
    return new this()
  }

  static fromJson(local: InstanceLocalType) {
    const instance = InstanceModule.dyn()
    instance.local.copy(local)
    return instance
  }

  constructor() {
    makeObservable(this, { local: observable })
  }

  local = InstanceLocal.dyn()
  private common = InstanceCommon.dyn(this.local)
  private gameProfile = InstanceProfile.dyn(this.local, this.common)
  private logging = InstanceLogging.dyn(this.local)
  tracker = InstanceTracker.dyn()
  private installer = InstanceInstaller.dyn(this.local, this.common, this.gameProfile, this.tracker)
  private launcher = InstanceLauncher.dyn(this.local, this.common, this.tracker, this.logging)

  install() {
    return this.installer.install()
  }

  repair() {
    return this.installer.repair()
  }

  launch() {
    return this.launcher.launch()
  }

  get logs() {
    return this.local.logs
  }

  get location() {
    return this.common.instanceDir
  }

  get busy() {
    return this.tracker.busy
  }

  get isRunning() {
    return this.launcher.isRunning
  }

  get profile() {
    return this.gameProfile.profile
  }

  get displayName() {
    return this.local.name.explain({ provider: this.local.provider, version: this.local.version.id ?? 'unknown' })
  }

  get installed() {
    return this.local.installed
  }

  get lastUsed() {
    return this.local.lastUsed
  }

  get uniqueId() {
    return this.local.nid
  }

  clearLogs() {
    this.local.logs = []
  }
}
