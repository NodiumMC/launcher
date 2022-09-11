import { OSType } from 'core'
import { platform } from 'native/os'

const _os = () => {
  switch (platform) {
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

export const os: OSType = _os()
