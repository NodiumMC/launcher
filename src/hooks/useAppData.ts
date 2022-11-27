import { useState } from 'react'
import { useOnce } from 'hooks/useOnce'
import { dataDir } from '@tauri-apps/api/path'
import { join } from 'native/path'

export const useAppData = (...paths: string[]) => {
  const [path, setPath] = useState<string | undefined>()
  useOnce(() => {
    dataDir().then(dir => setPath(join(dir, ...paths)))
  })
  return path
}

export const useGameDir = () => {
  return useAppData('.nodium')
}
