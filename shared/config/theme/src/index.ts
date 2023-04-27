import { createEvent, createStore } from 'effector'
import { get, set } from '@storage/kv'
import { DEFAULT_THEME } from './constants'

export const setTheme = createEvent<string>()

const key = 'app_theme'

export const $theme = createStore(await get(key, DEFAULT_THEME)).on(setTheme, (_, payload) => {
  set(key, payload)

  return payload
})
