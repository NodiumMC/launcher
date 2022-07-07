import { FC, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { AppPreloader } from './blocks/AppPreloader/AppPreloader'
import { Header } from './blocks/header/Header'
import { useTheme } from './hooks/theme'
import { usePopup, useStartup } from './hooks/useService'
import { useThemeToggleHotkey } from './hooks/useThemeToggleHotkey'
import { Screens } from './screens/Screens'
import { Observer } from './store/ObserverComponent'
import { GlobalStyle } from './style/global'
import { PopupContainer } from './blocks/popup/PopupContainer'
import { DefaultPopup } from './blocks/popup/DefaultPopup'
import { filter, fromEvent } from 'rxjs'
import { PopupBase } from './blocks/popup/PopupBase'

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
  const { theme } = useTheme()
  useStartup()
  useThemeToggleHotkey()
  const popup = usePopup()
  useEffect(() => {
    fromEvent(document, 'keyup').pipe(filter((event) => (event as KeyboardEvent).key === 'F9')).subscribe(() => {
      console.log('clicked!')
      popup.spawn(<DefaultPopup level={'info'} title={'Ok'} description={'Ok'} actions={[{
        label: 'Забубенить',
        action: close => close(),
      }]} />)
    })
  },[])
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppRoot>
          <Header />
          <View>
            <AppPreloader />
            <Screens />
            <PopupContainer />
          </View>
        </AppRoot>
      </ThemeProvider>
    </>
  )
})
