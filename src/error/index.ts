import { format, namedClass } from 'utils'
import { I18nModule, R18T } from 'i18n'
import { container } from '@nodium/tsyringe'
import { DebugModule, error as debugError } from 'debug'

export function error<A extends [...any]>(name: string, message: string | R18T) {
  const i18n = container.resolve(I18nModule)
  return namedClass(
    class extends Error {
      constructor(...args: [...A, { cause?: any }] | A) {
        const cause = args.last?.cause
        super(
          format(
            typeof message === 'function' ? i18n.resolve(message) : message,
            ...(cause ? args.underslice(1) : args),
          ),
          { cause },
        )
        debugError(this, ...chain(this))
      }
    },
    name,
  )
}

type ErrorConstructor<T extends Error = Error> = new (...args: any[]) => T

export function of(constructor: ErrorConstructor): string {
  return constructor.name
}

type MapType = {
  [k: string]: ((err: Error) => void) | undefined
  else?: (err: Error) => void
}

export function isError(any: any): any is Error {
  return any instanceof Error
}

export function match(map: MapType) {
  return function (exception: unknown) {
    if (!isError(exception)) return
    for (const [key, then] of Object.entries(map)) {
      if (exception.constructor.name === key) return then?.(exception)
    }
    map.else?.(exception)
  }
}

const debugModule = container.resolve(DebugModule)

export function chain(error: any, limit = 1): any[] {
  if (limit === 0) return []
  if (!isError(error)) return []
  if (!error.cause) return []
  return [error.cause, ...chain(error.cause, limit - 1)]
}

export function represent(error: any, explicit: boolean | number | 'auto' = 'auto'): string {
  if (typeof error === 'string') return error
  const origin = error?.message ?? error
  if (!explicit) return origin
  if (explicit === 'auto' && !debugModule.isEnabled) return origin
  const causes = chain(error, typeof explicit === 'number' ? explicit : 3)
  if (causes.length === 0) return origin
  return `${origin}: ${causes.map(represent).join(': ')}`
}

export function mapErr(constructor: ErrorConstructor) {
  return function (exception: any): never {
    throw new constructor({ cause: exception })
  }
}

export function mapErrFactory(factory: (err: Error) => Error) {
  return function (exception: any): never {
    throw factory(exception)
  }
}

export function next(fn: (err: Error) => any) {
  return function (exception: any) {
    const result = fn(exception)
    if (isError(result)) throw result
    throw exception
  }
}
