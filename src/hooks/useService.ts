import { useStore } from './useStore'
import { useEffect } from 'react'

export const usePreloader = () => useStore(s => s.preloader)

export const useStartup = () => {
  const startup = useStore(s => s.startup)
  useEffect(() => startup.run(), [])
}

export const useI18N = () => useStore(s => s.i18n)
export const useStorage = () => useStore(s => s.storage)
export const usePopup = () => useStore(s => s.popup)
export const useLauncherConfig = () => useStore(s => s.launcherConfig)
export const useLoggingPool = () => useStore(s => s.loggingPool)
export const useLogger = () => useStore(s => s.loggingPool.main)
