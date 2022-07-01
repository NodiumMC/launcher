import React from 'react'
import { Container } from 'typedi'
import { ThemeService } from '../app/theme/Theme.service'

const store = {
  theme: Container.get(ThemeService)
}

export type GlobalStoreType = typeof store

export const createStore = (): GlobalStoreType => ({...store})


export const StoreContext = React.createContext<GlobalStoreType | null>(null)
