import localforage from 'localforage'
import { entangulation } from '@lib/tangle'

const TANGLE_KEY = Symbol('@storage/kv#tangle')

const storage = localforage.createInstance({
  driver: localforage.LOCALSTORAGE,
})

export async function get<T>(key: string, defaultValue: T): Promise<T>
export async function get<T>(key: string): Promise<T | null>
export async function get<T>(key: string, defaultValue?: T): Promise<T | null> {
  return (await storage.getItem<T>(key)) ?? entangulation(TANGLE_KEY)?.[key] ?? defaultValue
}

export function set<T>(key: string, value: T): Promise<T> {
  return storage.setItem(key, value)
}

export function remove(key: string) {
  return storage.removeItem(key)
}

export function clear() {
  return storage.clear()
}

export function preload() {
  const container = entangulation(TANGLE_KEY)

  storage.iterate((value, key) => {
    container[key] = value
  })
}
