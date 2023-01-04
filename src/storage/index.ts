import * as localforage from 'localforage'
import { autorun } from 'mobx'

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

export function sync<V, T, K extends keyof T>(
  that: T,
  key: K,
  name: string,
  get?: (value: V) => T[K],
  set?: (value: T[K]) => V,
) {
  main.getItem<V>(name).then(value => {
    if (value !== null) that[key] = get?.(value) ?? (value as T[K])
  })
  autorun(() => {
    main.setItem<V>(name, set?.(that[key]) ?? (that[key] as V))
  })
}
