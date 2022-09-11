import { action, makeObservable, observable } from 'mobx'
import { LauncherProfiles } from 'core'
import { join } from 'native/path'
import { exists, GameDir, readJsonFile, writeJsonFile } from 'native/filesystem'
import { Initable, Module } from 'mobmarch'
import { watch } from 'tauri-plugin-fs-watch-api'
import { Fastore } from 'interfaces/Fastore'
import { LauncherProfile } from 'minecraft/LauncherProfile'
import { BlakeMapService } from 'core/services/BlakeMap.service'
import { fetch } from '@tauri-apps/api/http'
import { createDir } from '@tauri-apps/api/fs'

@Module([BlakeMapService])
export class GameProfileService implements Initable, Fastore<LauncherProfile> {
  @observable _list: LauncherProfile[] = []

  get list() {
    return this._list
  }

  async init() {
    watch(await this.pathToProfile(), {}, this.reloadProfiles.bind(this))
    return this.reloadProfiles()
  }

  constructor(private readonly blake: BlakeMapService) {
    makeObservable(this)
  }

  private pathToProfile = async () =>
    join(await GameDir(), 'launcher_profiles.json')

  @action.bound
  async reloadProfiles() {
    const pathToProfiles = await this.pathToProfile()
    if (!(await exists(pathToProfiles))) {
      await this.createEmptyProfile()
      return
    }
    const profileOptions = await readJsonFile<LauncherProfiles>(
      pathToProfiles,
    ).then(({ profiles }) => Object.values(profiles))
    this._list = profileOptions.map(o => new LauncherProfile(o, this.blake))
  }

  async save() {
    await writeJsonFile<LauncherProfiles>(await this.pathToProfile(), {
      profiles: Object.fromEntries(
        this._list.map(v => [v.options.lastVersionId, v.options]),
      ),
    })
  }

  async New(provider: string, name: string, id: string, tag: string) {
    const source = `https://nadmelas.nodium.ru/version/${provider}/${tag}`
    const profile = new LauncherProfile(
      {
        lastVersionId: id,
        source,
        name,
        type: 'custom',
        ready: false,
        created: new Date().toISOString(),
      },
      this.blake,
    )
    this._list.push(profile)
    await this.save()
    const version = await fetch(source).then(v => v.data)
    const versionPath = join(await GameDir(), 'versions', id)
    await createDir(versionPath, { recursive: true })
    await writeJsonFile(join(versionPath, `${id}.json`), version)
    await profile.install().finally(() => this.save())
    return profile
  }

  private createEmptyProfile = async () =>
    writeJsonFile(await this.pathToProfile(), {
      profiles: {},
    })
}
