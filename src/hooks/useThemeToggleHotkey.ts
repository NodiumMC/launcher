import { filter, fromEvent } from 'rxjs'
import { useEffect } from 'react'
import { useDeferredModule } from 'mobmarch'
import { ThemeService } from 'theme'
import { UpfallService } from 'notifications'

export const useThemeToggleHotkey = (hotkey = 'F4') => {
  const [, theme] = useDeferredModule(ThemeService)

  const [, upfall] = useDeferredModule(UpfallService)

  useEffect(() => {
    if (theme) {
      const s = fromEvent(document, 'keyup')
        .pipe(filter(event => (event as KeyboardEvent).key === hotkey))
        .subscribe(() => {
          theme.current === 'dark'
            ? theme.setTheme('light')
            : theme.setTheme('dark')
          upfall?.drop('ok', 'Тема изменена')
        })
      return () => s.unsubscribe()
    }
  }, [theme])
}
