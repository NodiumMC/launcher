import { invoke } from '@tauri-apps/api'
import { dirname } from 'native/path'
import { prepare } from 'native/filesystem'

export const Rdownload = async (url: string, local: string, hash?: string): Promise<string> => {
  await prepare(dirname(local))
  return invoke('download', {
    item: {
      url,
      local,
      hash,
    },
  })
}
