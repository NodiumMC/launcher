import { DebugModule, error } from 'debug'
import { I18nModule, Lang } from 'i18n'
import { container } from '@nodium/tsyringe'

export function w(
  data: string | number | object | ((throws: Lang['throws']) => string),
  debug?: string,
  cause?: string | number | object,
): never
export function w(
  data: string | number | object | ((throws: Lang['throws']) => string),
  debug?: string,
  cause?: boolean,
): Error
export function w(
  data: string | number | object | ((throws: Lang['throws']) => string),
  debug?: string,
  cause?: any,
): never | Error {
  let i18n: I18nModule | undefined = undefined
  let dm = false
  try {
    i18n = container.resolve(I18nModule)
    dm = container.resolve(DebugModule).isEnabled
  } catch (e) {
    /* empty */
  }
  const message = dm ? debug : typeof data === 'function' ? i18n?.resolve($ => data($.throws)) : data
  cause ? error(debug ?? message, cause) : error(debug ?? message)
  if (cause === true) return new Error(message?.toString(), { cause })
  else throw new Error(message?.toString(), { cause })
}

export function erm(error: any) {
  return error?.message ?? error
}
