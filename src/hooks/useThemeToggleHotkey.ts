import { filter, fromEvent } from 'rxjs'
import { useEffect } from 'react'
import { useDeferredModule } from 'mobmarch'
import { ThemeService } from 'theme'

export const useThemeToggleHotkey = (hotkey = 'F10') => {
  const [, theme] = useDeferredModule(ThemeService)
  useEffect(() => {
    if (theme) {
      const s = fromEvent(document, 'keyup')
        .pipe(filter(event => (event as KeyboardEvent).key === hotkey))
        .subscribe(() =>
          theme.current === 'dark'
            ? theme.setTheme('light')
            : theme.setTheme('dark'),
        )
      return () => s.unsubscribe()
    }
  }, [theme])
}
