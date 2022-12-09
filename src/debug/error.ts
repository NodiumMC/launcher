import { error } from 'debug/delog.service'
import { I18n, R18T } from 'i18n'
import { container } from 'tsyringe'

export function w(data: any | R18T, cause?: any): never {
  let i18n: I18n | undefined = undefined
  try {
    i18n = container.resolve(I18n)
  } catch (e) {
    /* empty */
  }
  const message = typeof data === 'function' ? i18n?.resolve(data) : data
  cause ? error(message, cause) : error(message)
  throw new Error(message, { cause })
}
