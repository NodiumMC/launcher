import { useStore } from './useStore'
import { useEffect } from 'react'

export const usePreloader = () => useStore(s => s.preloader)

export const useStartup = () => {
  const startup = useStore(s => s.startup)
  useEffect(() => startup.run(), [])
}

export const useI18N = () => useStore(s => s.i18n)
export const useStorage = () => useStore(s => s.storage)
export const useIsInstalled = () => useStore(s => s.storage._.launcher.installed)
