import { Initable, Module } from 'mobmarch'
import { VersionInstallService } from 'core/services/VersionInstall.service'
import { LoggingPool } from 'logging'
import { Instance } from 'minecraft/Instance'
import { dirname, join } from '@tauri-apps/api/path'
import { exists, GameDir, readJsonFile, writeJsonFile } from 'native/filesystem'
import { createDir, readDir, removeDir, renameFile } from '@tauri-apps/api/fs'
import { NonNullFilter } from 'utils/filters'
import { InstanceSettings } from 'minecraft/InstanceSettings'
import { GameProfileService } from 'core/services/GameProfile.service'
import { makeObservable, observable } from 'mobx'

@Module([VersionInstallService, LoggingPool, GameProfileService])
export class InstanceStore implements Initable {
  @observable list: Instance[] = []

  async init() {
    await createDir(await this.instancesPath(), { recursive: true })
    await this.listNewInstances()
  }

  constructor(
    private readonly pool: LoggingPool,
    private readonly installer: VersionInstallService,
    private readonly profiles: GameProfileService,
  ) {
    makeObservable(this)
  }

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
    return !!instance.name
  }

  async listNewInstances() {
    try {
      const instancePathes = await this.listAllInstanceFiles()
      const instancesJson = await instancePathes
        .mapAsync(async file => {
          try {
            return {
              ...(await readJsonFile<InstanceSettings>(file)),
              path: await dirname(file),
            }
          } catch (e) {
            console.warn(`Failed to load ${file} instance file`)
          }
        })
        .then(v => v.filter(NonNullFilter))
      const newInstances = instancesJson.filter(
        i => !this.list.some(v => v.settings.vid === i.vid),
      )
      newInstances
        .filter(this.validateInstanceSettings.bind(this))
        .forEach(settings =>
          this.list.push(
            new Instance(settings, this.pool, this.installer, settings.path),
          ),
        )
    } catch (e) {
      console.warn('Failed to load new instances')
      // TODO: add noteup after implemented #NDML-2 (https://nodium.youtrack.cloud/issue/NDML-2/Noteup-sistema)
    }
  }

  async saveInstance(path: string) {
    const instance = this.list.find(v => v.path === path)
    if (!instance) throw new Error('Instance not found')
    const newPath = await join(await dirname(path), instance.settings.name)
    instance.path = newPath
    await renameFile(path, newPath)
    const serialized = instance.asJson
    const instanceFilePath = await join(path, 'instance.json')
    await writeJsonFile(instanceFilePath, serialized)
  }

  async deleteInstance(path: string) {
    if (!path.includes('instances')) return
    this.list.removeIf(v => v.path === path)
    await removeDir(path, { recursive: true })
  }

  async new() {
    const name = 'Instance' + (this.list.length + 1)
    const path = await join(await this.instancesPath(), name)
    if (!(await exists(path))) await createDir(path)
    this.list.push(
      new Instance(
        {
          name,
          vid: this.profiles.profiles[0]?.lastVersionId ?? 'Unspecified',
        },
        this.pool,
        this.installer,
        path,
      ),
    )
    await this.saveInstance(path)
  }

  get sorted() {
    return [...this.list].sort()
  }
}
