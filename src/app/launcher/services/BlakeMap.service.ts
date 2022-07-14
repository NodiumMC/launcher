import { singleton } from 'tsyringe'
import { join } from '@tauri-apps/api/path'
import { readTextFile, writeTextFile } from '@tauri-apps/api/fs'
import { exists, GameDir } from '../../filesystem/utils'
import { BlakeMap } from '../utils/types'

@singleton()
export class BlakeMapService {
  map: BlakeMap = {}

  async path() {
    return join(await GameDir(), 'blakemap.json')
  }

  async load() {
    const path = await this.path()
    if (!await exists(path)) return
    const stringifiedMap = await readTextFile(path)
    this.map = JSON.parse(stringifiedMap)
  }

  async save() {
    await writeTextFile(await this.path(), JSON.stringify(this.map))
  }
}
