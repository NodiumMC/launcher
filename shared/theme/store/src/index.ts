import { createEvent, restore } from 'effector'

export const setTheme = createEvent<string>()

export const $theme = restore(setTheme, 'dark')
