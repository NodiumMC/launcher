import { SupportedTheme } from 'theme'
import { SupportedLang } from 'i18n/langs'

export interface MainStorage {
  theme: SupportedTheme
  lang: SupportedLang
  gameDir: string
  local_nickname: string
  [k: string]: any
}

export type Defaults<T> = { [K in keyof T]: Awaitable<T[K]> | null }
