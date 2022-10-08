import { join } from 'native/path'
import { autorun, makeAutoObservable, toJS } from 'mobx'
import { AppData, exists, readJson5File, writeJson5File } from 'native/filesystem'
import { BeforeResolve, Module } from 'mobmarch'
import { Preloader } from 'preload'

@Module([Preloader])
export class DataStorage {
  data: any = {}

  private [BeforeResolve]() {
    return this.preloader.add('Initializing Storage', this.load.bind(this))
  }

  constructor(private readonly preloader: Preloader) {
    makeAutoObservable(this)
    autorun(async () => await writeJson5File(await this.path(), toJS(this.data)))
  }

  private async path() {
    return join(await AppData(), 'data.json5')
  }

  private async load() {
    const path = await this.path()
    if (!(await exists(path))) await writeJson5File(path, this.data)
    this.data = await readJson5File(path)
  }
}
