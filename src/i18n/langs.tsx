import ru_RU from 'assets/lang/ru_RU.json'
import en_US from 'assets/lang/en_US.json'
import { ReactNode } from 'react'
import { RU, US } from 'country-flag-icons/react/3x2'
import { Structure } from 'i18n/Structure'

export const SupportedLangs = ['ru_RU', 'en_US'] as const
export type SupportedLang = typeof SupportedLangs[number]
export const Launguage: Record<SupportedLang, Structure> = {
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
