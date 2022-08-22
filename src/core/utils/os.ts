import { OSType } from 'core'
import { platform } from 'native/os'

export const os = async (): Promise<OSType> => {
  switch (await platform()) {
    case 'linux':
      return 'linux'
    case 'win32':
      return 'windows'
    case 'darwin':
      return 'osx'
    case 'android':
      return 'linux'
    default:
      return 'unknown'
  }
}
