import { AtomEffect } from 'recoil'
import { get, remove, set, StorageId } from '@storage/db'

export const storageEffect =
  <T>(storageId: StorageId, key: string, defaultValue: T): AtomEffect<T> =>
  ({ setSelf, onSet, trigger }) => {
    const loadPersistent = async () => setSelf(await get(storageId, key, defaultValue))

    if (trigger === 'get') {
      loadPersistent()
    }

    onSet((newValue, _, isReset) => {
      if (isReset) {
        remove(storageId, key)
      } else {
        set(storageId, key, newValue)
      }
    })
  }
