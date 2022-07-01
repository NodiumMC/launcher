import { FC } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { useTheme } from './hooks/theme'
import { Observer } from './store/ObserverComponent'
import { Header } from './blocks/header/Header'
import { useThemeToggleHotkey } from './hooks/useThemeToggleHotkey'

const AppRoot = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.back};
  padding: 6px;
  transition: background-color ${({ theme }) => theme.transition.time};
`

export const App: FC = Observer(() => {
  const { theme } = useTheme()
  useThemeToggleHotkey()

  return <>
    <ThemeProvider theme={theme}>
      <AppRoot>
        <Header />
      </AppRoot>
    </ThemeProvider>
  </>
})
