import { join } from 'native/path'
import { exists, GameDir, readJsonFile, writeJsonFile } from 'native/filesystem'
import { BlakeMap } from 'core'
import { BeforeResolve, Module } from 'mobmarch'
import { CentralConfig } from 'storage'

@Module([CentralConfig])
export class BlakeMapService {
  map: BlakeMap = {}

  private [BeforeResolve]() {
    return this.load()
  }

  constructor(private readonly cc: CentralConfig) {}

  async path() {
    return join(this.cc.get('main.gameDir', await GameDir()), 'blakemap.json')
  }

  async load() {
    const path = await this.path()
    if (!(await exists(path))) await writeJsonFile(path, {})
    this.map = await readJsonFile(path)
    // setInterval(() => this.save(), 10000)
  }

  async save() {
    await writeJsonFile(await this.path(), this.map)
  }
}
