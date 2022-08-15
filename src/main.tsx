import './tse/jsutils'
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'reflect-metadata'
import { App } from 'App'
import { createStore, StoreContext } from 'store/store'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider value={createStore()}>
      <App />
    </StoreContext.Provider>
  </React.StrictMode>,
)
