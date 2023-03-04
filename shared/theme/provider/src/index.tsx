import { GlobalStyles } from '@theme/global'
import type { FC, PropsWithChildren } from 'react'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import { theme } from '@theme/store'
import { useRecoilState } from 'recoil'

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [themeValue] = useRecoilState(theme)

  return (
    <>
      <GlobalStyles />
      <EmotionThemeProvider theme={themeValue}>{children}</EmotionThemeProvider>
    </>
  )
}
