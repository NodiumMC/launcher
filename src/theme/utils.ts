import { dark, light } from 'theme/list'
import { css, DefaultTheme } from 'styled-components'
import { mix } from 'polished'
import { map } from 'utils'

export const deviceThemeIsDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches
export const deviceTheme = (): DefaultTheme => (deviceThemeIsDark() ? dark : light)

export function pick(color: string, shade = 500) {
  return shade > 500
    ? css(({ theme }) => mix(map(shade, 500, 1000, 1, 0), color, theme.master.front))
    : css(({ theme }) => mix(map(shade, 0, 500, 0, 1), color, theme.master.back))
}
