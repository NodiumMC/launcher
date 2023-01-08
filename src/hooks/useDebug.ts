import { DebugModule } from 'debug'
import { useEffect, useMemo } from 'react'
import { filter, fromEvent } from 'rxjs'
import { useMod } from 'hooks/useMod'

export const useDebugHotkey = () => {
  const debug = useMod(DebugModule)

  useEffect(() => {
    if (!debug) return
    const sub = fromEvent(document, 'keyup')
      .pipe(
        filter(
          event =>
            (event as KeyboardEvent).code === 'Space' &&
            (event as KeyboardEvent).altKey &&
            (event as KeyboardEvent).ctrlKey,
        ),
      )
      .subscribe(() => debug.toggle())
    return () => sub.unsubscribe()
  }, [debug])
}

export const useDebugMode = () => {
  const debug = useMod(DebugModule)
  return useMemo(() => !!debug?.isEnabled, [debug?.isEnabled])
}
