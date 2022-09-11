import { fetch } from '@tauri-apps/api/http'

export const fetcher =
  <T>(base: string) =>
  <T>(url: string) =>
    fetch<T>(base + url, { method: 'GET' }).then(v => v.data)
