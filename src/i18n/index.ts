import type { Lang } from 'i18n/langs'

export * from './i18n.service'
export * from './langs'

export type R18T = (structure: Lang) => string
