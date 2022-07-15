import './tse/jsutils'
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'reflect-metadata'
import { App } from './App'
import './style/fonts.css'
import { createStore, StoreContext } from './store/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider value={createStore()}>
      <App />
    </StoreContext.Provider>
  </React.StrictMode>,
)
