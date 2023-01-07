import { container } from '@nodium/tsyringe'
import { DelogModule } from './delog.module'

export * from './delog.module'

export const log = (...args: any[]) => container.resolve(DelogModule).log(...args)
export const warn = (...args: any[]) => container.resolve(DelogModule).warn(...args)
export const error = (...args: any[]) => container.resolve(DelogModule).error(...args)
export const time = (description: string, key: string | symbol) => container.resolve(DelogModule).takeTime(description, key)
export const endTime = (key: string | symbol) => container.resolve(DelogModule).endTime(key)
