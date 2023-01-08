import * as localforage from 'localforage'
import { autorun, toJS } from 'mobx'

export const main = localforage.createInstance({
  driver: localforage.INDEXEDDB,
  name: 'NDML',
  storeName: 'main',
})

export const cache = localforage.createInstance({
  driver: localforage.INDEXEDDB,
  name: 'NDML',
  storeName: 'cache',
})

export function sync<V, T, K extends keyof T>(that: T, key: K, get?: (value: V) => T[K], set?: (value: T[K]) => V) {
  const name = key.toString()
  main.getItem<V>(name).then(value => {
    if (value !== null) that[key] = toJS(get?.(value) ?? (value as T[K]))
  })
  autorun(() => {
    main.setItem<V>(name, set?.(that[key]) ?? (that[key] as V))
  })
}
