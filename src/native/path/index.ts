import { delimiter as tDelimiter, sep as tSep } from '@tauri-apps/api/path'
import { isUnix } from 'native/os'

export const delimiter = tDelimiter
export const separator = tSep

const split = (path: string) => path.split(separator)

export const normalize = (path?: string) => {
  if (!path || path.length === 0) return '.'
  return path
    .replaceAll(separator.repeat(2), separator)
    .replaceAll(separator.repeat(3), separator)
    .replaceAll('/', separator)
    .replaceAll('//', separator)
}

export const dirname = (path: string) => normalize(split(normalize(path)).underslice(1).join(separator))

export const join = (...paths: string[]) => normalize(paths.join(separator))

export const extend = (path: string, ext: string) => path + '.' + ext

export const extendExecutable = (path: string) => (isUnix ? path : extend(path, 'exe'))
