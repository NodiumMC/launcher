import React from 'react'
import { StoreContext } from 'store/store'
import { GlobalStoreType } from 'store/store'

export const useStore = <S = unknown>(
  selector: (store: GlobalStoreType) => S,
) => {
  const store = React.useContext(StoreContext)
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.')
  }
  return selector(store)
}
