import { Schema } from '@theme/types'
import { LazyRecord } from '@lib/types'

type LazySchema = {
  [K in keyof Schema]: LazyRecord<Schema[K]>
}

function initialize<T extends Record<any, any>>(record: LazyRecord<T>): T {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [key, typeof value === 'function' ? value() : value]),
  ) as T
}

export function makeThemePart<T>(schemaInitializer: Partial<T>): T {
  return Object.fromEntries(
    Object.entries(schemaInitializer).map(([key, value]) => [key, initialize(value as any)]),
  ) as T
}

export function makeTheme(schemaInitializer: LazySchema): Schema {
  return makeThemePart(schemaInitializer) as Schema
}
