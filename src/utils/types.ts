export type Awaitable<T = any> = Promise<T> | T
export type Nullable<T> = T extends object
  ? { [P in keyof T]: Nullable<T[P]> }
  : T | null | undefined

export type Tuple<T, N extends number> = N extends N ? number extends N ? T[] : _TupleOf<T, N, []> : never
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TupleOf<T, N, [T, ...R]>
