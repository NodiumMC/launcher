export * from './filters'
export * from './wait'
export * from './loadIcons'
export * from './promise'
export * from './react'
export * from './todo'
export * from './style'
export * from './import'
export * from './progress'
export * from './reflection'
export * from './string'
export * from './snapshot'

export const l = (fn: () => Awaitable) => fn()
