export * from './filters'
export * from './wait'
export * from './loadIcons'
export * from './promise'
export * from './react'
export * from './todo'
export * from './style'
export * from './import'
export * from './progress'

export const l = (fn: () => Awaitable) => fn()
