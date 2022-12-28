import { ReactNode } from 'react'
import { RU, US } from 'country-flag-icons/react/3x2'
import ru_RU from './langs/ru_RU'
import en_US from './langs/en_US'

export const SupportedLangs = ['ru_RU', 'en_US'] as const
export type SupportedLang = typeof SupportedLangs[number]
export type Lang = typeof ru_RU
export const Launguage: Record<SupportedLang, Lang> = {
  ru_RU,
  en_US,
}

export interface LanguageMeta {
  label: string
  icon: ReactNode
}

export const LangMeta: Record<SupportedLang, LanguageMeta> = {
  ru_RU: {
    label: 'Русский',
    icon: <RU />,
  },
  en_US: {
    label: 'English (US)',
    icon: <US />,
  },
}
