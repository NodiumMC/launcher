import { separator } from './constants'

const split = (path: string) => path.split(separator)

export const normalize = (path?: string) => {
  if (!path || path.length === 0) return '.'
  return path
    .replaceAll(separator.repeat(2), separator)
    .replaceAll(separator.repeat(3), separator)
    .replaceAll('/', separator)
    .replaceAll('//', separator)
}

export function dirname(path: string) {
  const normalized = split(normalize(path))

  normalized.pop()

  return normalized.join(separator)
}

export function join(...paths: string[]) {
  return normalize(paths.join(separator))
}
