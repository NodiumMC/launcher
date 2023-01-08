import type { Lang } from 'i18n/langs'

export { I18nModule } from './i18n.module'
export * from './langs'

export type R18T = (structure: Lang) => string
