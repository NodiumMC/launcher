import { BlakeMapService } from 'core/services/BlakeMap.service'
import { install, VersionInstallEvent } from 'core'
import EventEmitter from 'eventemitter3'
import { Module } from 'mobmarch'
import { join } from '@tauri-apps/api/path'
import { GameDir } from 'native/filesystem'

@Module([BlakeMapService])
export class VersionInstallService {
  constructor(private readonly blakemap: BlakeMapService) {}

  private async _install(vid: string, clientDir: string, gameDataDir: string) {
    await this.blakemap.load()
    const inp = await install({
      clientDir,
      gameDataDir,
      blakemap: this.blakemap.map,
      vid,
    })
    inp.on('unit', (name, hash) => (this.blakemap.map[name] = hash))
    const emitter = new EventEmitter<Omit<VersionInstallEvent, 'unit'>>()
    inp.on('download', progress => emitter.emit('download', progress))
    inp.on('unzip', progress => emitter.emit('unzip', progress))
    inp.on('done', async () => {
      await this.blakemap.save()
      emitter.emit('done')
    })
    inp.on('error', e => emitter.emit('error', e))
    return emitter
  }

  async install(vid: string) {
    return this._install(
      vid,
      await join(await GameDir(), 'versions', vid),
      await GameDir(),
    )
  }
}
