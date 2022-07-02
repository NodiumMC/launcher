import { join } from '@tauri-apps/api/path'
import { makeObservable, observable } from 'mobx'
import { AppData, exists } from './utils'
import { readTextFile, writeTextFile } from '@tauri-apps/api/fs'
import { singleton } from 'tsyringe'

@singleton()
export class Storage {
  @observable private storage: Record<string, any> = {}

  constructor() {
    makeObservable(this)
  }

  async path() {
    return join(await AppData(), 'data.json')
  }

  async save() {
    await writeTextFile(await this.path(), JSON.stringify(this.storage))
  }

  async load() {
    const path = await this.path()
    if (!await exists(path)) await writeTextFile(path, '{}')
    this.storage = JSON.parse(await readTextFile(path))
  }

  set<T>(key: string, value: T, save = true) {
    this.storage[key] = value
    save && this.save()
  }

  get<T>(key: string, defaultValue?: T): T {
    return this.storage[key] ?? defaultValue
  }
}
