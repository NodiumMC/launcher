import { useCallback, useState } from 'react'
import { invoke } from '@tauri-apps/api'
import { useOnce } from 'hooks/useOnce'

export interface OSInfo {
  free_mem: number
  total_mem: number
}

export const useOsInfo = (fetchOnUse = true) => {
  const [data, setData] = useState<OSInfo | undefined>()
  const fetch = useCallback(async () => setData(await invoke('info')), [])
  useOnce(() => {
    if (fetchOnUse) fetch()
  })
  return { data, fetch }
}
