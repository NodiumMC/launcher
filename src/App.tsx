import { FC } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { AppPreloader } from 'components/macro/AppPreloader'
import { Header } from 'components/macro/header'
import { useOnce, useThemeToggleHotkey } from 'hooks'
import { Style } from 'global'
import { PopupContainer } from 'components/macro/popup'
import { Fonts, preload } from 'components/utils/Font'
import { Defer, Observer, useDeferredModule } from 'mobmarch'
import { deviceTheme, ThemeService } from 'theme'
import { PopupService } from 'notifications'
import { Preloader } from 'preload'
import { Updater } from 'updater'
import { Routes } from 'Routes'
import { useFontawesomeLoader } from 'hooks/useFontawesomeLoader'

const AppRoot = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.palette.back.default};
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
  useOnce(preload)
  useFontawesomeLoader()
  return (
    <>
      <ThemeProvider theme={theme?.theme ?? deviceTheme()}>
        <Style />
        <Fonts />
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
          </View>
        </AppRoot>
      </ThemeProvider>
    </>
  )
})
