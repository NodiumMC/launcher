import { createEvent, restore } from 'effector'

export const setLocale = createEvent<string>()

export const $locale = restore(setLocale, navigator.language.split(/[-_]/)[0])
