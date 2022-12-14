import * as localforage from 'localforage'

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
