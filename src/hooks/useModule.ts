import { I18nModule, Lang } from 'i18n'
import { useMod } from 'hooks/useMod'

export function useI18N(): I18nModule
export function useI18N(s: null): Lang
export function useI18N<T>(s: (t: Lang) => T): T
export function useI18N<T>(s?: ((t: Lang) => T) | null): any {
  if (s) {
    return s(useMod(I18nModule).translate)
  } else if (s === null) {
    return useMod(I18nModule).translate
  } else return useMod(I18nModule)
}
