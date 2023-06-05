import { addons } from '@storybook/addons'
import { dark, light } from './theme'
import { STORY_THEME } from './constants'

addons.setConfig({
  theme: STORY_THEME  === 'dark' ? dark : light
})
