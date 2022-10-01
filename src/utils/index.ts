export * from './filters'
export * from './wait'
export * from './loadIcons'
export * from './promise'
export * from './react'
export * from './todo'
export * from './style'

export const l = (fn: () => Awaitable) => fn()
