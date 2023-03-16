import { Observable } from 'rxjs'
import { execute, keygen } from '@native/tools'
import { invoke } from '@tauri-apps/api'
import { emit, listen } from '@tauri-apps/api/event'

export function spawn(binary: string, cwd: string, args: string[]): Observable<string> {
  return new Observable<string>(subscriber => {
    const std = keygen()
    const errevent = keygen()
    const close = keygen()

    execute(() => invoke('spawn', { binary, args, cwd, std, errevent, close }))

    const errorListener = listen(errevent, ({ payload }) => subscriber.error(payload))
    const closeListener = listen(close, () => subscriber.complete())
    const stdListener = listen(std, ({ payload }) => subscriber.next(payload?.toString()))

    return () => {
      errorListener.then(listener => listener())
      closeListener.then(listener => listener())
      stdListener.then(listener => listener())

      emit('kill')
    }
  })
}
