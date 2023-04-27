import { GlobalStyles } from '@theme/global'
import { type FC } from 'react'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import { FontStyles } from '@theme/font'
import dark from '@theme/dark-schema'
import light from '@theme/light-schema'
import { $theme } from '@config/theme'
import { useStore } from 'effector-react'
import { ThemeProviderProps } from './theme-provider.interface'

const themes = { dark, light }

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const theme = useStore($theme)

  return (
    <>
      <GlobalStyles />
      <FontStyles />
      <EmotionThemeProvider theme={themes[theme as keyof typeof themes]}>{children}</EmotionThemeProvider>
    </>
  )
}
