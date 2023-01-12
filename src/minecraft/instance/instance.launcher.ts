import { DynamicService } from 'positron'
import { InstanceLocal } from './instance.local'
import { InstanceCommon } from './instance.common'
import { InstanceTracker } from './instance.tracker'
import { InstanceLogging } from './instance.logging'
import { JavaRuntimeModule } from 'java'
import { PlayerLiteModule } from 'user'
import { action, computed, makeObservable, observable } from 'mobx'
import { Child, spawn } from 'native/shell'
import { compileArguments, VersionedLaunchOptions } from 'core'
import { GeneralSettingsModule } from 'settings'
import { promise } from 'utils'
import { extendExecutable } from 'native/path'
import { exists } from 'native/filesystem'
import {
  MissingJVMException,
  MissingJVMExecutable,
  MultipleProcessesException,
  NeedsInstallationException,
  NoProfileException,
} from 'minecraft/instance/instance.exceptions'
import { next } from 'error'
import { InstanceProfile } from 'minecraft/instance/instance.profile'

@DynamicService
export class InstanceLauncher {
  static dyn(
    local: InstanceLocal,
    common: InstanceCommon,
    tracker: InstanceTracker,
    logging: InstanceLogging,
    profile: InstanceProfile,
  ): InstanceLauncher {
    return new (this as any)(local, common, tracker, logging, profile)
  }

  constructor(
    private readonly local: InstanceLocal,
    private readonly common: InstanceCommon,
    private readonly tracker: InstanceTracker,
    private readonly logging: InstanceLogging,
    private readonly profile: InstanceProfile,
    private readonly java: JavaRuntimeModule,
    private readonly player: PlayerLiteModule,
    private readonly settings: GeneralSettingsModule,
  ) {
    makeObservable(this)
  }

  @observable private child: Child | null = null

  private getJvmExecutable(major: number) {
    const candidate = this.java.for(major)
    if (!candidate) throw new MissingJVMException()
    return candidate
  }

  async createProcess() {
    const version = await this.common.readManifest()
    const vlaunch: VersionedLaunchOptions = {
      version,
      javaExecutable: this.getJvmExecutable(version.javaVersion.majorVersion),
      vid: this.common.versionId,
      gameDataDir: this.settings.gameDir,
      gameDir: this.common.instanceDir,
      clientDir: this.common.clientDir,
      ...this.local.settings,
      username: this.player.nickname,
    }
    const args = compileArguments(vlaunch)
    if (!(await exists(extendExecutable(vlaunch.javaExecutable)))) throw new MissingJVMExecutable()
    return spawn(vlaunch.javaExecutable, args, vlaunch.gameDir)
  }

  @action
  async launch() {
    return promise<number>(async (r, j) => {
      if (this.isRunning) throw new MultipleProcessesException()
      if (!this.local.installed) throw new NeedsInstallationException()
      if (!(await this.profile.exists())) throw new NoProfileException()
      this.tracker.busy = true
      this.child = await this.createProcess()
      this.child.on('std', data => this.logging.push(data))
      this.child.on('error', err => {
        this.resetChild()
        j(err)
      })
      this.child.on('close', code => {
        this.resetChild()
        r(code)
      })
      this.local.updateLastUsed()
      this.tracker.busy = false
    }).catch(next(() => (this.tracker.busy = false)))
  }

  @action
  private resetChild() {
    this.child = null
  }

  @computed
  get isRunning() {
    return !!this.child
  }
}
