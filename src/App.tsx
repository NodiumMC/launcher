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
import { log } from 'debug'
import { container } from 'tsyringe'
import { AceStyle } from 'debug/commander'

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
  log((container as any)['_registry']['_registryMap'])
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
          </View>
        </AppRoot>
      </ThemeProvider>
    </>
  )
})
