import { createGlobalStyle, css } from 'styled-components'
import GTEestiProText from 'assets/fonts/GTEestiProText.ttf'
import TomorrowMedium from 'assets/fonts/Tomorrow/Tomorrow-MediumItalic.ttf'
import TomorrowLight from 'assets/fonts/Tomorrow/Tomorrow-Light.ttf'
import Rubik from 'assets/fonts/Rubik/Rubik-Regular.ttf'

export const font = (name?: string) => css`
  font-family: ${({ theme }) => name ?? theme.fonts.text}, sans-serif;
`

export const fontFace = (
  name: string,
  src: string,
  variant: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 = 400,
) => css`
  @font-face {
    font-family: ${name};
    src: local(${name}), url(${src});
    font-weight: ${variant};
  }
`

export const Fonts = createGlobalStyle`
  ${fontFace('GTEestiProText', GTEestiProText)}
  ${fontFace('Tomorrow', TomorrowMedium, 600)}
  ${fontFace('Tomorrow', TomorrowLight, 300)}
  ${fontFace('Rubik', Rubik)}
`
