import { join } from 'native/path'
import { autorun, makeAutoObservable, toJS } from 'mobx'
import { AppData, exists, readJson5File, writeJson5File } from 'native/filesystem'
import { BeforeResolve, Module } from 'mobmarch'
import { Preloader } from 'preload'

@Module([Preloader])
export class DataStorage {
  private _data: any = {}

  get data() {
    return this._data ?? {}
  }

  private [BeforeResolve]() {
    return this.preloader.add('Initializing Storage', this.load.bind(this))
  }

  constructor(private readonly preloader: Preloader) {
    makeAutoObservable(this)
    autorun(() => {
      if (Object.keys(this._data).length === 0) return
      const toSave = toJS(this.data)
      return this.path().then(path => writeJson5File(path, toSave))
    })
  }

  private async path() {
    return join(await AppData(), 'data.json5')
  }

  private async load() {
    const path = await this.path()
    if (!(await exists(path))) await writeJson5File(path, this._data ?? {})
    this._data = await readJson5File(path)
  }
}
