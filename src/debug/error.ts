import { DebugService, error } from 'debug'
import { I18n, Lang } from 'i18n'
import { container } from 'tsyringe'

export function w(
  data: string | number | object | ((throws: Lang['throws']) => string),
  debug?: string,
  cause?: any,
): never {
  let i18n: I18n | undefined = undefined
  let dm = false
  try {
    i18n = container.resolve(I18n)
    dm = container.resolve(DebugService).isEnabled
  } catch (e) {
    /* empty */
  }
  const message = dm ? debug : typeof data === 'function' ? i18n?.resolve($ => data($.throws)) : data
  cause ? error(debug ?? message, cause) : error(debug ?? message)
  throw new Error(message?.toString(), { cause })
}

export function erm(error: any) {
  return error?.message ?? error
}
