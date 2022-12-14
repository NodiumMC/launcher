import { filter, fromEvent } from 'rxjs'
import { useEffect } from 'react'
import { ThemeService } from 'theme'
import { UpfallService } from 'notifications'
import { time } from 'debug'
import { useMod } from 'hooks/useMod'

export const useThemeToggleHotkey = (hotkey = 'F4') => {
  const theme = useMod(ThemeService)
  const upfall = useMod(UpfallService)

  useEffect(() => {
    const s = fromEvent(document, 'keyup')
      .pipe(filter(event => (event as KeyboardEvent).key === hotkey))
      .subscribe(() => {
        const end = time('Theme changed', 'theme_change')
        theme.current === 'dark' ? theme.setTheme('light') : theme.setTheme('dark')
        upfall?.drop('ok', r => r.appearance.theme.reloading)
        end()
      })
    return () => s.unsubscribe()
  }, [theme, upfall])
}
