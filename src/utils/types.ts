export type Awaitable<T = any> = PromiseLike<T> | T
export type Nullable<T> = T extends object
  ? { [P in keyof T]: Nullable<T[P]> }
  : T | null | undefined
