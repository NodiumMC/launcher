import { DynamicService } from 'positron'
import { InstanceTracker } from './instance.tracker'
import { InstanceCommon } from './instance.common'
import { InstanceProfile } from './instance.profile'
import { JavaRuntimeModule } from 'java'
import { promise } from 'utils'
import { compileLocal, populate, unzipNatives } from 'core'
import { GeneralSettingsModule } from 'settings'
import { batchDownload } from 'network'
import { join } from 'native/path'
import { prepare } from 'native/filesystem'
import { InstanceLocal } from './instance.local'
import { mapErr } from 'error'
import {
  AssetsInstallException,
  JVMInstallException,
  PopulateManifestException,
  UnpackNativesException,
} from './instance.exceptions'

@DynamicService
export class InstanceInstaller {
  static dyn(
    local: InstanceLocal,
    common: InstanceCommon,
    profile: InstanceProfile,
    tracker: InstanceTracker,
  ): InstanceInstaller {
    return new (this as any)(local, common, profile, tracker)
  }

  constructor(
    private readonly local: InstanceLocal,
    private readonly common: InstanceCommon,
    private readonly profile: InstanceProfile,
    private readonly tracker: InstanceTracker,
    private readonly java: JavaRuntimeModule,
    private readonly settings: GeneralSettingsModule,
  ) {}

  private async compile() {
    return compileLocal(this.common.versionId, this.common.clientDir, this.settings.gameDir)
  }

  private async prepare() {
    await prepare(this.common.instanceDir)
  }

  private installJDK() {
    return promise(async (r, j) => {
      const manifest = await this.common.readManifest()
      const installer = await this.java.install(manifest.javaVersion.majorVersion)
      if (!installer) return r()
      installer.subscribe({
        next: value => this.tracker.progress.update(value.progress, value.total, value.stage),
        complete: r,
        error: j,
      })
    })
  }

  private async populateManifest() {
    await this.common.updateManifest(await populate(await this.common.readManifest()))
  }

  private installAssets() {
    return promise(async (r, j) => {
      batchDownload(await this.compile()).subscribe({
        next: value => this.tracker.progress.update(value.progress, value.total, 2),
        complete: r,
        error: j,
      })
    })
  }

  private unzipNatives() {
    return promise((r, j) => {
      unzipNatives(join(this.common.clientDir, 'natives')).subscribe({
        next: value => this.tracker.progress.update(value.progress, value.total, 3),
        complete: r,
        error: r,
      })
    })
  }

  async install() {
    this.tracker.busy = true
    try {
      await this.installJDK().catch(mapErr(JVMInstallException))
      await this.prepare()
      await this.populateManifest().catch(mapErr(PopulateManifestException))
      await this.installAssets().catch(mapErr(AssetsInstallException))
      await this.unzipNatives().catch(mapErr(UnpackNativesException))
      this.tracker.progress.reset(0)
      this.tracker.busy = false
      this.local.installed = true
    } catch (e) {
      this.tracker.progress.reset(0)
      this.tracker.busy = false
    }
  }

  repair() {
    this.local.installed = false
  }
}
