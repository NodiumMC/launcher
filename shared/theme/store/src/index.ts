import { atom } from 'recoil'
import { storageEffect } from '@storage/recoil'
import { StorageId } from '@storage/db'

const storage = {
  name: 'appearance',
  version: '1',
} satisfies StorageId

export const theme = atom({
  key: 'app_theme',
  default: 'dark',
  effects: [storageEffect(storage, 'theme', 'dark')],
})
