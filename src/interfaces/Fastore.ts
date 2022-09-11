export interface Fastore<T> {
  list: T[]

  New(...args: unknown[]): void
}
