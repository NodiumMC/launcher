import * as localforage from 'localforage'

const container: Record<string, typeof localforage> = {}

export interface StorageId {
  scope?: string
  name: string
  version: string
}

function storageKey({ name, version }: StorageId) {
  return `${name}:${version}`
}

async function factory(storageId: StorageId) {
  const key = storageKey(storageId)

  container[key] ||= localforage.createInstance({
    name: storageId.scope ?? 'ndml',
    storeName: key,
    driver: localforage.INDEXEDDB,
  })

  await container[key]?.ready()

  return container[key]
}

export interface StorageMethods {
  get<T = any>(key: string): Promise<T | null>
  get<T>(key: string, defaultValue: T): Promise<T>
  set<T>(key: string, value: T): Promise<void>
  remove(key: string): Promise<void>
  drop(): Promise<void>
}

export async function get<T = any>(storageId: StorageId, key: string): Promise<T | null>
export async function get<T>(storageId: StorageId, key: string, defaultValue: T): Promise<T>
export async function get<T>(storageId: StorageId, key: string, defaultValue?: T) {
  const storage = await factory(storageId)

  return (await storage.getItem(key)) ?? defaultValue
}

export async function set<T>(storageId: StorageId, key: string, value: T) {
  const storage = await factory(storageId)

  await storage.setItem(key, value)
}

export async function remove(storageId: StorageId, key: string) {
  const storage = await factory(storageId)

  return storage.removeItem(key)
}

export async function drop(storageId: StorageId) {
  const storage = await factory(storageId)

  return storage.clear()
}

export function db(storageId: StorageId): StorageMethods {
  return {
    get: (...args: any[]) => get(storageId, ...(args as [any])),
    set: (...args) => set(storageId, ...args),
    remove: (...args) => remove(storageId, ...args),
    drop: (...args) => drop(storageId, ...args),
  }
}

export async function init(storageId: StorageId) {
  await factory(storageId)
}
