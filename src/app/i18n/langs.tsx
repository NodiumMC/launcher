import ru_RU from './lang/ru_RU.json'
import en_US from './lang/en_US.json'
import { ReactNode } from 'react'
import { RU, US } from 'country-flag-icons/react/3x2'

export const SupportedLangs = ['ru_RU', 'en_US'] as const
export type SupportedLang = typeof SupportedLangs[number]
export const Launguage: Record<SupportedLang, Record<string, object>> = {
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
