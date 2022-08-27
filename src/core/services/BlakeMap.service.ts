import { join } from '@tauri-apps/api/path'
import { exists, GameDir, readJsonFile, writeJsonFile } from 'native/filesystem'
import { BlakeMap } from 'core'
import { Module } from 'mobmarch'

@Module
export class BlakeMapService {
  map: BlakeMap = {}

  async path() {
    return join(await GameDir(), 'blakemap.json')
  }

  async load() {
    const path = await this.path()
    if (!(await exists(path)))
      await writeJsonFile(path, {})
    this.map = await readJsonFile(path)
  }

  async save() {
    await writeJsonFile(await this.path(), this.map)
  }
}
