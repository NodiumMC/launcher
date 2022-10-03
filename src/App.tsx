import { FC } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { AppPreloader } from 'components/macro/AppPreloader'
import { Header } from 'components/macro/header'
import { useThemeToggleHotkey } from 'hooks'
import { PopupContainer, PopupService, UpfallConatiner, UpfallService } from 'notifications'
import { Fonts, Style } from 'style'
import { Defer, Observer, useDeferredModule } from 'mobmarch'
import { deviceTheme, ThemeService } from 'theme'
import { Preloader } from 'preload'
import { Updater } from 'updater'
import { Routes } from 'Routes'
import { useFontawesomeLoader } from 'hooks/useFontawesomeLoader'
import { useDebugHotkey } from 'hooks/useDebug'
import { AceStyle } from 'debug/commander'
import { CrashOverlay } from 'components/macro/CrashOverlay'
import { ReportService } from 'debug/report.service'

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

export const App: FC = Observer(() => {
  const [, theme] = useDeferredModule(ThemeService)
  useDeferredModule(Updater)
  useThemeToggleHotkey()
  useFontawesomeLoader()
  useDebugHotkey()
  return (
    <>
      <ThemeProvider theme={theme?.theme ?? deviceTheme()}>
        <Style />
        <Fonts />
        <AceStyle />
        <AppRoot>
          <Header />
          <View>
            <Defer depend={Preloader}>
              <AppPreloader />
            </Defer>
            <Routes />
            <Defer depend={PopupService}>
              <PopupContainer />
            </Defer>
            <Defer depend={UpfallService}>
              <UpfallConatiner />
            </Defer>
            <Defer depend={ReportService}>
              <CrashOverlay />
            </Defer>
          </View>
        </AppRoot>
      </ThemeProvider>
    </>
  )
})
