import { singleton } from 'tsyringe'
import { BlakeMapService } from 'core/services/BlakeMap.service'
import { install, VersionInstallEvent } from 'core'
import EventEmitter from 'eventemitter3'

@singleton()
export class VersionInstallService {
  constructor(private readonly bm: BlakeMapService) {}

  async install(clientDir: string, gameDataDir: string) {
    await this.bm.load()
    const inp = await install({ clientDir, gameDataDir, blakemap: this.bm.map })
    inp.on('unit', (name, hash) => (this.bm.map[name] = hash))
    const emitter = new EventEmitter<Omit<VersionInstallEvent, 'unit'>>()
    inp.on('download', progress => emitter.emit('download', progress))
    inp.on('unzip', progress => emitter.emit('unzip', progress))
    inp.on('done', async () => {
      await this.bm.save()
      emitter.emit('done')
    })
    inp.on('error', e => emitter.emit('error', e))
    return emitter
  }
}
