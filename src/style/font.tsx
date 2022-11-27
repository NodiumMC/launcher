import { createGlobalStyle, css } from 'styled-components'
import gteestiprotext_regular from 'assets/fonts/GTEestiProText.ttf'
import tomorrow_medium from 'assets/fonts/Tomorrow/Tomorrow-MediumItalic.ttf'
import tomorrow_light from 'assets/fonts/Tomorrow/Tomorrow-Light.ttf'
import rubik from 'assets/fonts/Rubik.ttf'
import fira_code from 'assets/fonts/FiraCode.ttf'
import { normalizeFontWeight } from 'utils'

export const font = (name?: string) => css`
  font-family: ${({ theme }) => name ?? theme.fonts.default};
`

export const fontFace = (name: string, src: string, weight: FontWeightLike = 'regular') => css`
  @font-face {
    font-family: ${name};
    src: url(${src});
    ${weight &&
    css`
      font-weight: ${normalizeFontWeight(weight)};
    `};
  }
`

export const Fonts = createGlobalStyle`
  ${fontFace('GTEestiProText', gteestiprotext_regular)}
  ${fontFace('Tomorrow', tomorrow_medium, 'medium')}
  ${fontFace('Tomorrow', tomorrow_light, 'light')}
  ${fontFace('Rubik', rubik)}
  ${fontFace('Fira Code', fira_code)}
`
