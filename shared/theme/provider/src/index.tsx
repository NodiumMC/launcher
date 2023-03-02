import { GlobalStyles } from '@theme/global'
import type { FC, PropsWithChildren } from 'react'
import { Theme, ThemeProvider as EmotionThemeProvider } from '@emotion/react'

export interface ThemeProviderProps extends PropsWithChildren {
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme)
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children, theme }) => (
  <>
    <GlobalStyles />
    <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
  </>
)
