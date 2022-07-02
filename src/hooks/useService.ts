import { useStore } from './useStore'
import { useEffect } from 'react'

export const usePreloader = () => useStore(s => s.preloader)

export const useStartup = () => {
  const startup = useStore(s => s.startup)
  useEffect(() => startup.run(), [])
}
