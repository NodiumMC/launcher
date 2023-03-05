import { atom } from 'recoil'
import dark from '@theme/dark-schema'
import light from '@theme/light-schema'

export const theme = atom({
  key: 'app_theme',
  default: dark,
})
