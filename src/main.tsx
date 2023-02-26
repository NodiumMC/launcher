console.log('Higer')
import 'reflect-metadata'
import './extra/jsutils'
import ReactDOM from 'react-dom/client'
import { App } from 'App'
import { MemoryRouter } from 'react-router-dom'
import { time } from 'debug'
import { configure } from 'mobx'
import { register } from 'native/deeplink'
import { appWindow } from '@tauri-apps/api/window'
import { QueryClient, QueryClientProvider } from 'react-query'

configure({
  enforceActions: 'never',
})

time('Startup', 'startup')

register('open', () => {
  appWindow.unminimize()
  appWindow.setFocus()
})

const queryClient = new QueryClient()

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <MemoryRouter>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </MemoryRouter>,
)
