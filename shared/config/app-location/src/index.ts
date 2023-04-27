import { createEvent, createStore } from 'effector'
import { get, set } from '@storage/kv'
import { DEFAULT_PATH } from './constants'

export const setAppLocation = createEvent<string>()

const key = 'app_location'

export const $appLocation = createStore(await get(key, DEFAULT_PATH)).on(setAppLocation, (_, payload) => {
  set(key, payload)

  return payload
})
