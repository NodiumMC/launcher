import './extra/jsutils'
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'reflect-metadata'
import { App } from 'App'
import { MarchProvider } from 'mobmarch'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MarchProvider>
      <App />
    </MarchProvider>
  </React.StrictMode>,
)
