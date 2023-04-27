import { createEvent, createStore } from 'effector'
import { get, set } from '@storage/kv'
import { DEFAULT_LOCALE } from './constants'

export const setLocale = createEvent<string>()

const key = 'app_locale'

export const $locale = createStore(await get(key, DEFAULT_LOCALE)).on(setLocale, (_, payload) => {
  set(key, payload)

  return payload
})
