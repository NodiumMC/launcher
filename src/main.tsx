import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './style/global.css'
import './style/fonts.css'
import 'reflect-metadata'
import { createStore, StoreContext } from './store/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider value={createStore()}>
      <App />
    </StoreContext.Provider>
  </React.StrictMode>,
)
