import { BeforeResolve, Module } from 'mobmarch'
import { LoggingPool } from 'logging'
import { Instance } from 'minecraft/Instance'
import { dirname, join } from 'native/path'
import { exists, GameDir, readJsonFile, writeJsonFile } from 'native/filesystem'
import { createDir, readDir, removeDir, renameFile } from '@tauri-apps/api/fs'
import { NonNullFilter } from 'utils/filters'
import { InstanceSettings } from 'minecraft/InstanceSettings'
import { GameProfileService } from 'core/services/GameProfile.service'
import { action, computed, makeObservable, observable } from 'mobx'
import { Fastore } from 'interfaces/Fastore'

@Module([LoggingPool, GameProfileService])
export class InstanceStore implements Fastore<Instance> {
  @observable list: Instance[] = []

  private async [BeforeResolve]() {
    await createDir(await this.instancesPath(), { recursive: true })
    await this.listNewInstances()
  }

  constructor(private readonly pool: LoggingPool, private readonly profiles: GameProfileService) {
    makeObservable(this)
  }

  private async instancesPath() {
    return join(await GameDir(), 'instances')
  }

  private async listAllInstanceFiles() {
    return readDir(await this.instancesPath(), { recursive: true })
      .then(dir => dir.map(v => v.children?.find(file => file.name === 'instance.json')?.path))
      .then(unfiltered => unfiltered.filter(NonNullFilter))
  }

  private validateInstanceSettings(instance: InstanceSettings) {
    return !!instance.name
  }

  @action
  async listNewInstances() {
    try {
      const instancePathes = await this.listAllInstanceFiles()
      const instancesJson = await instancePathes
        .mapAsync(async file => {
          try {
            return {
              ...(await readJsonFile<InstanceSettings>(file)),
              path: dirname(file),
            }
          } catch (e) {
            console.warn(`Failed to load ${file} instance file`)
          }
        })
        .then(v => v.filter(NonNullFilter))
      const newInstances = instancesJson.filter(i => !this.list.some(v => v.settings.vid === i.vid))
      newInstances
        .filter(this.validateInstanceSettings.bind(this))
        .forEach(settings => this.list.push(new Instance(settings, this.pool, settings.path)))
    } catch (e) {
      console.warn('Failed to load new instances')
      // TODO: add noteup after implemented #NDML-2 (https://nodium.youtrack.cloud/issue/NDML-2/Noteup-sistema)
    }
  }

  async saveInstance(path: string) {
    const instance = this.list.find(v => v.path === path)
    if (!instance) throw new Error('Instance not found')
    const newPath = join(dirname(path), instance.settings.name)
    instance.path = newPath
    await renameFile(path, newPath)
    const serialized = instance.asJson
    const instanceFilePath = join(newPath, 'instance.json')
    await writeJsonFile(instanceFilePath, serialized)
  }

  @action
  async deleteInstance(path: string) {
    if (!path.includes('instances')) return
    this.list.removeIf(v => v.path === path)
    await removeDir(path, { recursive: true })
  }

  @action
  async New() {
    const name = 'Instance' + (this.list.length + 1)
    const path = join(await this.instancesPath(), name)
    if (!(await exists(path))) await createDir(path)
    this.list.push(
      new Instance(
        {
          name,
          vid: this.profiles.list[0]?.options.lastVersionId ?? 'Unspecified',
        },
        this.pool,
        path,
      ),
    )
    await this.saveInstance(path)
  }

  @computed
  get sorted() {
    return [...this.list].sort()
  }
}
