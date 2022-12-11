import * as localforage from 'localforage'
import { Defaults, MainStorage } from 'storage/types'
import { GameDir } from 'native/filesystem'
import { makeAutoObservable, observe, toJS } from 'mobx'

const wrap = <T extends object>(storage: LocalForage, defaults?: Defaults<T>): T => {
  const target = makeAutoObservable<Defaults<T>>((defaults ?? {}) as any)
  observe(target, change => {
    if (change.type === 'remove') storage.removeItem(change.name as string)
    else storage.setItem(change.name as string, toJS(change.object[change.name]))
  })
  return target as T
}

const load = async (storage: LocalForage, to: any) => {
  for (const key of await storage.keys()) {
    const value = await storage.getItem(key)
    if (value !== null && value !== undefined) to[key] = value
  }
}

const mainStorage = localforage.createInstance({
  driver: localforage.INDEXEDDB,
  name: 'NDML',
  storeName: 'main',
})

export const main = wrap<MainStorage>(mainStorage, {
  gameDir: await GameDir(),
  lang: null,
  theme: null,
  local_nickname: 'Player',
  instances: [],
})

export const cache = localforage.createInstance({
  driver: localforage.INDEXEDDB,
  name: 'NDML',
  storeName: 'cache',
})

export const loadStorages = Promise.all([load(mainStorage, main)])
