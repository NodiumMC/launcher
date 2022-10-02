import { action, makeObservable, observable } from 'mobx'
import { LauncherProfiles } from 'core'
import { join } from 'native/path'
import { exists, GameDir, readJsonFile, writeJsonFile } from 'native/filesystem'
import { BeforeResolve, Module } from 'mobmarch'
import { watch } from 'tauri-plugin-fs-watch-api'
import { Fastore } from 'interfaces/Fastore'
import { LauncherProfile } from 'minecraft/LauncherProfile'
import { BlakeMapService } from 'core/services/BlakeMap.service'
import { fetch } from '@tauri-apps/api/http'
import { createDir } from '@tauri-apps/api/fs'
import { UpfallService } from 'notifications'

@Module([BlakeMapService])
export class GameProfileService implements Fastore<LauncherProfile> {
  @observable private _list: LauncherProfile[] = []

  get list() {
    return this._list
  }

  private async [BeforeResolve]() {
    watch(await this.pathToProfile(), {}, this.reloadProfiles.bind(this))
    return this.reloadProfiles()
  }

  constructor(private readonly blake: BlakeMapService, private readonly upfall: UpfallService) {
    makeObservable(this)
  }

  private pathToProfile = async () => join(await GameDir(), 'launcher_profiles.json')

  @action
  async reloadProfiles() {
    const pathToProfiles = await this.pathToProfile()
    if (!(await exists(pathToProfiles))) {
      await this.createEmptyProfile()
      return
    }
    const profileOptions = await readJsonFile<LauncherProfiles>(pathToProfiles).then(({ profiles }) =>
      Object.values(profiles),
    )
    this._list = profileOptions.map(o => new LauncherProfile(o, this.blake))
  }

  @action
  async save() {
    await writeJsonFile<LauncherProfiles>(await this.pathToProfile(), {
      profiles: Object.fromEntries(this._list.map(v => [v.options.lastVersionId, v.options])),
    })
  }

  @action
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
    this.upfall.drop('default', r => r.minecraft.added_new_version)
    let failed = false
    await profile
      .install()
      .catch((e: any) => {
        failed = true
        this.upfall.drop('error', r =>
          r.minecraft.version_install_failed.explain({
            reason: e.message,
          }),
        )
      })
      .then(() => {
        if (failed) return
        this.upfall.drop('ok', r => r.minecraft.version_install_successful)
      })
      .finally(() => this.save())
    return profile
  }

  private createEmptyProfile = async () =>
    writeJsonFile(await this.pathToProfile(), {
      profiles: {},
    })
}
