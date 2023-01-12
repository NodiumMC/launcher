import { toJS } from 'mobx'

export class Snapshot<T> {
  static take<T>(target: T, ...keys: Array<keyof T>) {
    const pick =
      keys.length > 0
        ? keys.reduce((result: any, key: any) => {
            result[key] = toJS(target[key as keyof T])
            return result
          }, {})
        : target
    return new Snapshot(pick, structuredClone(pick))
  }

  constructor(private readonly target: T, private readonly data: any) {}

  restore() {
    for (const key in this.data) this.target[key as keyof T] = this.data[key]
  }
}

export const snapshot = <T extends object>(target: T, ...keys: Array<keyof T>) => Snapshot.take(target, ...keys)
