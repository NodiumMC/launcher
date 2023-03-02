import { atom } from 'recoil'
import dark from '@theme/dark-schema'

export const theme = atom({
  key: 'app_theme',
  default: dark,
})
