export type LazyRecord<T extends Record<any, any>> = { [K in keyof T]: T[K] | (() => T[K]) }
export type InitializeLazyRecord<T extends LazyRecord<any>> = {
  [K in keyof T]: T[K] extends () => infer R ? R : T[K]
}
