import { Initable, Module } from 'mobmarch'
import { VersionInstallService } from 'core/services/VersionInstall.service'
import { LoggingPool } from 'logging'
import { Instance } from 'minecraft/Instance'
import { join } from '@tauri-apps/api/path'
import { GameDir, readJsonFile } from 'native/filesystem'
import { createDir, readDir } from '@tauri-apps/api/fs'
import { NonNullFilter } from 'utils/filters'
import { InstanceSettings } from 'minecraft/InstanceSettings'
import { GameProfileService } from 'core/services/GameProfile.service'

@Module([VersionInstallService, LoggingPool, GameProfileService])
export class InstanceStore implements Initable {
  instances: Instance[] = []

  async init() {
    await createDir(await this.instancesPath(), { recursive: true })
    await this.listNewInstances()
  }

  constructor(
    private readonly pool: LoggingPool,
    private readonly installer: VersionInstallService,
    private readonly profiles: GameProfileService,
  ) {}

  private async instancesPath() {
    return await join(await GameDir(), 'instances')
  }

  private async listAllInstanceFiles() {
    return readDir(await this.instancesPath(), { recursive: true })
      .then(dir =>
        dir.map(
          v => v.children?.find(file => file.name === 'instance.json')?.path,
        ),
      )
      .then(unfiltered => unfiltered.filter(NonNullFilter))
  }

  private validateInstanceSettings(instance: InstanceSettings) {
    return (
      this.profiles.profiles.some(p => p.lastVersionId === instance.vid) &&
      instance.name &&
      instance.alloc
    )
  }

  async listNewInstances() {
    try {
      const instancePathes = await this.listAllInstanceFiles()
      const instancesJson = await instancePathes
        .mapAsync(async file => {
          try {
            return readJsonFile<InstanceSettings>(file)
          } catch (e) {
            console.warn(`Failed to load ${file} instance file`)
          }
        })
        .then(v => v.filter(NonNullFilter))
      const newInstances = instancesJson.filter(
        i => !this.instances.some(v => v.settings.vid === i.vid),
      )
      newInstances
        .filter(this.validateInstanceSettings.bind(this))
        .forEach(settings =>
          this.instances.push(
            new Instance(settings, this.pool, this.installer),
          ),
        )
    } catch (e) {
      console.warn('Failed to load new instances')
      // TODO: add noteup after implemented #NDML-2 (https://nodium.youtrack.cloud/issue/NDML-2/Noteup-sistema)
    }
  }
}
