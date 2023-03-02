import { Schema } from '@theme/types'

type PathAccumulator<T> = {
  [K in keyof T]: T[K] extends Record<any, any> ? PathAccumulator<T[K]> : () => string
}

function _path<T>(acc = () => null! as string): PathAccumulator<T> {
  return new Proxy(acc, {
    get(target, next) {
      return _path(() => {
        const prev = acc()
        return prev ? `${prev}.${next.toString()}` : next.toString()
      })
    },
  }) as unknown as PathAccumulator<T>
}

export const path = _path<Schema>()
