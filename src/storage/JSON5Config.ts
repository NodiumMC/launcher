import { action, autorun, computed, makeObservable, observable, toJS } from 'mobx'
import { AppData, exists, readJson5File, writeJson5File } from 'native/filesystem'
import { join } from 'native/path'
import { watch } from 'tauri-plugin-fs-watch-api'
import _ from 'lodash'

export class JSON5Config<T = any> {
  @observable private _data: any = {}
  get data(): any {
    return this._data
  }

  constructor(public readonly name: string) {
    makeObservable(this)
    autorun(() => {
      if (Object.keys(this.data).length === 0) return
      const toSave = toJS(this.data)
      return this.path().then(path => writeJson5File(path, toSave))
    })
  }

  async save() {
    await writeJson5File(await this.path(), toJS(this.data))
  }

  private async path() {
    return join(await AppData(), `${this.name}.json5`)
  }

  @action
  async load() {
    const path = await this.path()
    if (!(await exists(path))) await writeJson5File(path, this.data ?? {})
    const local = await readJson5File(path)
    this._data = local
    const stop = await watch(path, {}, () => {
      stop()
      if (!_.isEqual(this.data, local)) this.load()
    })
  }

  @action
  set<V>(path: ObjectPaths<T>, value: V) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const pathArr = (path as string).split('.')
    let obj = this.data
    for (const property of pathArr.underslice(1)) {
      obj[property] = obj[property] ?? {}
      obj = obj[property]
    }
    obj[pathArr.last] = value
  }

  get<V>(path: ObjectPaths<T>, defaultValue: V): V {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const pathArr = (path as string).split('.')
    let obj = this.data
    for (const property of pathArr) {
      obj = obj?.[property]
    }
    return obj ?? defaultValue
  }
}
