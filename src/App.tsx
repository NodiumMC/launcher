import { FC } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { AppPreloader } from 'components/macro/AppPreloader'
import { Header } from 'components/macro/header'
import { useThemeToggleHotkey } from 'hooks'
import { PopupContainer, UpfallConatiner } from 'notifications'
import { Fonts, Style } from 'style'
import { ThemeService } from 'theme'
import { Updater } from 'updater'
import { Routes } from 'Routes'
import { useFontawesomeLoader } from 'hooks/useFontawesomeLoader'
import { useDebugHotkey } from 'hooks/useDebug'
import { AceStyle } from 'debug/commander'
import { ErrorBoundary } from 'debug/ErrorBoundary'
import { useMod } from 'hooks/useMod'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'

const AppRoot = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.master.back};
  padding: 6px;
  transition: background-color ${({ theme }) => theme.transition.time};
  display: flex;
  flex-direction: column;
`

const View = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 6px;
  flex-grow: 1;
  position: relative;
`

export const App: FC = observer(() => {
  const theme = useMod(ThemeService)
  useMod(Updater)
  useThemeToggleHotkey()
  useFontawesomeLoader()
  useDebugHotkey()
  return (
    <>
      <ThemeProvider theme={toJS(theme.theme)}>
        <Style />
        <Fonts />
        <AceStyle />
        <AppRoot>
          <Header />
          <ErrorBoundary>
            <View>
              <AppPreloader />
              <Routes />
              <PopupContainer />
              <UpfallConatiner />
            </View>
          </ErrorBoundary>
        </AppRoot>
      </ThemeProvider>
    </>
  )
})
