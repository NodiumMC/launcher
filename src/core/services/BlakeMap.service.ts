import { join } from 'native/path'
import { exists, GameDir, readJsonFile, writeJsonFile } from 'native/filesystem'
import { BlakeMap } from 'core'
import { Initable, Module } from 'mobmarch'

@Module
export class BlakeMapService implements Initable{
  map: BlakeMap = {}

  init() {
    return this.load()
  }

  async path() {
    return join(await GameDir(), 'blakemap.json')
  }

  async load() {
    const path = await this.path()
    if (!(await exists(path))) await writeJsonFile(path, {})
    this.map = await readJsonFile(path)
  }

  async save() {
    await writeJsonFile(await this.path(), this.map)
  }
}
