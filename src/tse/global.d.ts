export {}

declare global {
  interface Array<T> {
    mapAsync<U>(callbackfn: (value: T, index: number, array: T[]) => Promise<U>): Promise<U[]>
    filterAsync(callbackfn: (value: T, index: number, array: T[]) => Promise<boolean>): Promise<T[]>
  }
}
