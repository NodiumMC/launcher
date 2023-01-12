import { DynamicModule } from 'positron'
import { InstanceLocal } from './instance.local'
import { InstanceCommon } from './instance.common'
import { InstanceTracker } from './instance.tracker'
import { InstanceProfile } from './instance.profile'
import { InstanceInstaller } from './instance.installer'
import { InstanceLogging } from './instance.logging'
import { InstanceLauncher } from './instance.launcher'
import { InstanceLocalType } from './instance.types'
import { makeObservable, observable } from 'mobx'
import { Popup, PopupModule, UpfallModule } from 'notifications'
import { mapErr, represent } from 'error'
import { I18nModule } from 'i18n'
import { LaunchException, NoProfileException } from 'minecraft/instance/instance.exceptions'
import { prepare } from 'native/filesystem'
import { GeneralSettingsModule } from 'settings'

@DynamicModule
export class InstanceModule {
  static dyn(): InstanceModule {
    return new (this as any)()
  }

  static fromJson(local: InstanceLocalType) {
    const instance = this.dyn()
    instance.local.copy(local)
    return instance
  }

  constructor(
    private readonly upfall: UpfallModule,
    private readonly popup: PopupModule,
    private readonly i18n: I18nModule,
    private readonly settings: GeneralSettingsModule,
  ) {
    makeObservable(this, { local: observable })
  }

  local = InstanceLocal.dyn()
  private common = InstanceCommon.dyn(this.local)
  private gameProfile = InstanceProfile.dyn(this.local, this.common)
  private logging = InstanceLogging.dyn(this.local)
  tracker = InstanceTracker.dyn()
  private installer = InstanceInstaller.dyn(this.local, this.common, this.gameProfile, this.tracker)
  private launcher = InstanceLauncher.dyn(this.local, this.common, this.tracker, this.logging, this.gameProfile)

  async init() {
    await this.validate(true)
    await prepare(this.common.instanceDir)
    this.local.location = this.settings.gameDir
  }

  async install() {
    try {
      await this.installer.install()
    } catch (e: any) {
      this.upfall.drop('error', represent(e, 1))
      throw e
    }
  }

  repair() {
    return this.installer.repair()
  }

  async launch() {
    try {
      const code = await this.launcher.launch().catch(mapErr(LaunchException))
      const lastEvent = this.local.logs.last
      if (code !== 0 || lastEvent.throwable)
        this.popup.create(Popup, {
          level: 'error',
          title: this.i18n.translate.minecraft.launch.minecraft_crashed,
          description: (lastEvent?.message ?? '') + '\n\n' + (lastEvent?.throwable ?? ''),
          actions: [{ label: 'Ok', action: close => close(), isPrimary: true }],
        })
    } catch (e) {
      this.upfall.drop('error', represent(e, 1))
    }
  }

  get logs() {
    return this.local.logs
  }

  get origin() {
    return this.local.location
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

  async exists() {
    return this.common.exists()
  }

  get working() {
    return this.isRunning || this.tracker.busy
  }

  async validate(first = false) {
    if (!(await this.gameProfile.exists()) && !first) {
      this.upfall.drop('error', t => t.minecraft.versions.selected_profile_not_exists)
      this.gameProfile.remove()
      throw new NoProfileException()
    }
  }
}
