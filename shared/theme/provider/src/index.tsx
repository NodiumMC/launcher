import { GlobalStyles } from '@theme/global'
import type { FC, PropsWithChildren } from 'react'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import { theme } from '@theme/store'
import { useRecoilState } from 'recoil'
import { FontStyles } from '@theme/font'

import dark from '@theme/dark-schema'
import light from '@theme/light-schema'

const themes = { dark, light }

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [themeValue, set] = useRecoilState(theme)

  return (
    <>
      <GlobalStyles />
      <FontStyles />
      <EmotionThemeProvider theme={themes[themeValue as keyof typeof themes]}>{children}</EmotionThemeProvider>
    </>
  )
}
