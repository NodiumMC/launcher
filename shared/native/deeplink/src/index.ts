import { listen } from '@tauri-apps/api/event'
import parse from 'url-parse'

export function register(path: string, handler: (url: parse<Record<string, string | undefined>>) => void) {
  const scheme = parse(path)

  return listen<string>('deeplink', ({ payload }) => {
    const url = parse(payload, true)

    if (scheme.pathname === url.pathname) {
      handler(url)
    }
  })
}
