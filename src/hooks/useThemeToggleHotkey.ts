import { useTheme } from './theme'
import { filter, fromEvent } from 'rxjs'
import { useEffect } from 'react'

export const useThemeToggleHotkey = (hotkey = 'F10') => {
  const { toggle } = useTheme()
  useEffect(() => {
    const s = fromEvent(document, 'keyup')
      .pipe(filter(event => (event as KeyboardEvent).key === hotkey))
      .subscribe(toggle)
    return () => s.unsubscribe()
  }, [])
}
