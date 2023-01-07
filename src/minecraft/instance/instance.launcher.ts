import { DynamicService } from 'positron'
import { InstanceLocal } from './instance.local'
import { InstanceCommon } from './instance.common'
import { InstanceTracker } from './instance.tracker'
import { InstanceLogging } from './instance.logging'
import { JavaRuntimeModule } from 'java'
import { PlayerLiteModule } from 'user'
import { action, computed, makeObservable, observable } from 'mobx'
import { Child } from 'native/shell'
import { launch } from 'core'
import { GeneralSettingsModule } from 'settings'
import { promise } from 'utils'

@DynamicService
export class InstanceLauncher {
  static dyn(
    local: InstanceLocal,
    common: InstanceCommon,
    tracker: InstanceTracker,
    logging: InstanceLogging,
  ): InstanceLauncher {
    return new (this as any)(local, common, tracker, logging)
  }

  constructor(
    private readonly local: InstanceLocal,
    private readonly common: InstanceCommon,
    private readonly tracker: InstanceTracker,
    private readonly logging: InstanceLogging,
    private readonly java: JavaRuntimeModule,
    private readonly player: PlayerLiteModule,
    private readonly settings: GeneralSettingsModule,
  ) {
    makeObservable(this)
  }

  @observable private child: Child | null = null

  @action
  async launch() {
    return promise<number>(async (r, j) => {
      this.tracker.busy = true
      this.child = await launch({
        javaExecutable: major => this.java.for(major),
        vid: this.common.versionId,
        gameDataDir: this.settings.gameDir,
        gameDir: this.common.instanceDir,
        clientDir: this.common.clientDir,
        ...this.local.settings,
        username: this.player.nickname,
      })
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
    })
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
