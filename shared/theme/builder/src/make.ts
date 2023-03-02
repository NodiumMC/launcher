import { Schema } from '@theme/types'
import { LazyRecord } from '@shared/lib/types'

type LazySchema = {
  [K in keyof Schema]: LazyRecord<Schema[K]>
}

function initialize<T>(record: LazyRecord<T>): T {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [key, typeof value === 'function' ? value() : value]),
  ) as T
}

export function makeThemePart<T>(schemaInitializer: Partial<T>) {
  return Object.fromEntries(Object.entries(schemaInitializer).map(([key, value]) => [key, initialize(value as any)]))
}

export function makeTheme(schemaInitializer: LazySchema) {
  return makeThemePart(schemaInitializer)
}
