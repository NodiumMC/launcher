import ru_RU from './lang/ru_RU.json'
import en_US from './lang/en_US.json'

export const SupportedLangs = ['ru_RU', 'en_US'] as const
export type SupportedLang = typeof SupportedLangs[number]
export const Launguage: Record<SupportedLang, Record<string, any>> = {
  ru_RU,
  en_US
}
