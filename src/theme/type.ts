import { dark } from 'theme/list/dark'
import { themes } from 'theme/themes'

export type Theme = typeof dark
export type SupportedTheme = keyof typeof themes
