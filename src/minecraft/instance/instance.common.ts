import { InstanceLocal } from './instance.local'
import { DynamicService } from 'positron'
import { GeneralSettingsModule } from 'settings'
import { join } from 'native/path'
import { exists } from '@tauri-apps/api/fs'
import { readJsonFile, writeJsonFile } from 'native/filesystem'
import { VersionFile } from 'core'
import { computed, makeObservable } from 'mobx'

@DynamicService
export class InstanceCommon {
  static dyn(local: InstanceLocal): InstanceCommon {
    return new (this as any)(local)
  }

  constructor(private readonly local: InstanceLocal, private readonly settings: GeneralSettingsModule) {
    makeObservable(this)
  }

  @computed
  get versionId() {
    return this.local.provider === 'custom' ? this.local.version.id : `${this.local.provider}-${this.local.version.id}`
  }

  @computed
  get clientDir() {
    return join(this.settings.gameDir, 'versions', this.versionId)
  }

  @computed
  get instanceDir() {
    return join(this.local.location ?? this.settings.gameDir, 'instances', this.local.nid)
  }

  async exists() {
    return exists(this.instanceDir)
  }

  @computed
  get manifestPath() {
    return join(this.clientDir, `${this.versionId}.json`)
  }

  async readManifest() {
    return readJsonFile<VersionFile>(this.manifestPath)
  }

  async updateManifest(manifest: VersionFile) {
    return writeJsonFile(this.manifestPath, manifest)
  }

  @computed
  get isCustom() {
    return this.local.provider === 'custom'
  }
}
