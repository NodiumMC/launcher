import { atom } from 'recoil'

export const locale = atom({
  key: 'locale',
  default: navigator.language.split(/[-_]/)[0],
})
