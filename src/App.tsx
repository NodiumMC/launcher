import { FC } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { AppPreloader } from 'components/macro/AppPreloader/AppPreloader'
import { Header } from 'components/macro/header/Header'
import { useThemeToggleHotkey } from 'hooks'
import { GlobalStyle } from 'global'
import { PopupContainer } from 'components/macro/popup/PopupContainer'
import { Fonts } from 'components/utils/Font'
import { Defer, Observer, useDeferredModule } from 'mobmarch'
import { deviceTheme, ThemeService } from 'theme'
import { PopupService } from 'notifications'
import { Preloader } from 'preload'
import { Updater } from 'updater'
import { Button } from 'components/micro/Button'
import { faGear } from '@fortawesome/free-solid-svg-icons'

const AppRoot = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.back};
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
  return (
    <>
      <ThemeProvider theme={theme?.theme ?? deviceTheme()}>
        <GlobalStyle />
        <Fonts />
        <AppRoot>
          <Header />
          <View>
            <Defer depend={Preloader}>
              <AppPreloader />
            </Defer>
            <Defer depend={PopupService}>
              <PopupContainer />
            </Defer>
          </View>
        </AppRoot>
      </ThemeProvider>
    </>
  )
})
