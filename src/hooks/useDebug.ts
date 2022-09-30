import { useDeferredModule } from 'mobmarch'
import { DebugService } from 'debug/debug.service'
import { useEffect, useMemo } from 'react'
import { filter, fromEvent } from 'rxjs'

export const useDebugHotkey = () => {
  const [, debug] = useDeferredModule(DebugService)

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
  const [, debug] = useDeferredModule(DebugService)
  return useMemo(() => !!debug?.isEnabled, [debug?.isEnabled])
}
