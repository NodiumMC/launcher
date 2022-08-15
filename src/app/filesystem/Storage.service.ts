import { join } from '@tauri-apps/api/path'
import { makeObservable, observable } from 'mobx'
import { AppData, exists, writeJsonFile } from './utils'
import { readTextFile } from '@tauri-apps/api/fs'
import { singleton } from 'tsyringe'
import { SupportedLang } from '../i18n/langs'
import { Nullable } from 'utils/types'
import { FN } from 'utils/UtilityTypes'

export interface StorageType {
  appearance: {
    darkTheme: Nullable<boolean>
    lang: SupportedLang
  }
  launcher: {
    installed: boolean
  }
  java: {
    path: string
  }
}

@singleton()
export class Storage {
  @observable _: StorageType
  private scheduled: FN[] = []

  constructor() {
    makeObservable(this)
    this._ = this.proxify({
      appearance: { darkTheme: null, lang: null },
      launcher: { installed: null },
      java: { path: null },
    } as Nullable<StorageType>)
  }

  private proxify<T>(target: unknown): T {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler: ProxyHandler<any> = {
      get: (target, key) => {
        if (typeof target[key] === 'object' && target[key] !== null) {
          return new Proxy(target[key], handler)
        } else {
          return target[key]
        }
      },
      set: (target, key, value) => {
        target[key] = value
        this.save()
        return true
      },
    }

    return new Proxy(target, handler)
  }

  async path() {
    return join(await AppData(), 'data.json')
  }

  async save() {
    await writeJsonFile(await this.path(), this._)
  }

  async load() {
    const path = await this.path()
    if (!(await exists(path))) await writeJsonFile(path, this._)
    this._ = this.proxify(JSON.parse(await readTextFile(path)))
    while (this.scheduled.length > 0) await this.scheduled.shift()?.()
  }

  onLoad(execute: FN) {
    this.scheduled.push(execute)
  }
}
