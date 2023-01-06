import { filter, fromEvent } from 'rxjs'
import { useEffect } from 'react'
import { ThemeModule } from 'theme'
import { UpfallModule } from 'notifications'
import { time } from 'debug'
import { useMod } from 'hooks/useMod'

export const useThemeToggleHotkey = (hotkey = 'F4') => {
  const theme = useMod(ThemeModule)
  const upfall = useMod(UpfallModule)

  useEffect(() => {
    const s = fromEvent(document, 'keyup')
      .pipe(filter(event => (event as KeyboardEvent).key === hotkey))
      .subscribe(() => {
        const end = time('Theme changed', 'theme_change')
        theme.theme === 'dark' ? (theme.theme = 'light') : (theme.theme = 'dark')
        upfall?.drop('ok', r => r.appearance.theme_changed)
        end()
      })
    return () => s.unsubscribe()
  }, [theme, upfall])
}
