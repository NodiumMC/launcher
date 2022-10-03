import ReactDOM from 'react-dom/client'
import 'reflect-metadata'
import './extra/jsutils'
import './extra/react'
import { App } from 'App'
import { MarchProvider } from 'mobmarch'
import { MemoryRouter } from 'react-router-dom'
import { time } from 'debug'
import { configure } from 'mobx'

configure({
  enforceActions: 'never',
})

time('Startup', 'startup')

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <MemoryRouter>
    <MarchProvider>
      <App />
    </MarchProvider>
  </MemoryRouter>,
)
