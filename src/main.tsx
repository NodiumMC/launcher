import ReactDOM from 'react-dom/client'
import 'reflect-metadata'
import './extra/jsutils'
import { App } from 'App'
import { MemoryRouter } from 'react-router-dom'
import { time } from 'debug'
import { configure } from 'mobx'
import { register } from 'native/deeplink'
import { appWindow } from '@tauri-apps/api/window'

configure({
  enforceActions: 'never',
})

time('Startup', 'startup')

register('open', () => {
  appWindow.unminimize()
  appWindow.setFocus()
})

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <MemoryRouter>
    <App />
  </MemoryRouter>,
)
