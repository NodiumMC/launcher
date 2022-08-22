import { singleton } from 'tsyringe'
import { join } from '@tauri-apps/api/path'
import { exists, GameDir, readJsonFile, writeJsonFile } from 'native/filesystem'
import { BlakeMap } from 'core'

@singleton()
export class BlakeMapService {
  map: BlakeMap = {}

  async path() {
    return join(await GameDir(), 'blakemap.json')
  }

  async load() {
    const path = await this.path()
    if (!(await exists(path))) return
    this.map = await readJsonFile(path)
  }

  async save() {
    await writeJsonFile(await this.path(), this.map)
  }
}
