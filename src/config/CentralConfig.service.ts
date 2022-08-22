import { join } from '@tauri-apps/api/path'
import { makeObservable, observable } from 'mobx'
import { AppData, exists, readJsonFile, writeJsonFile } from 'native/filesystem'
import { Initable, Module } from 'mobmarch'
import { Preloader } from 'preload'

@Module([Preloader])
export class CentralConfig implements Initable {
  @observable private _data?: any

  init() {
    return this.preloader.add('Initializing Storage', this.load.bind(this))
  }

  constructor(private readonly preloader: Preloader) {
    makeObservable(this)
  }

  async path() {
    return join(await AppData(), 'data.json')
  }

  async save() {
    await writeJsonFile(await this.path(), this._data)
  }

  async load() {
    const path = await this.path()
    if (!(await exists(path))) await writeJsonFile(path, this._data)
    this._data = await readJsonFile(path)
  }

  get isLoaded() {
    return this._data !== undefined
  }

  get data() {
    return this._data ?? {}
  }
}
