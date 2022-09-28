export {}

declare global {
  interface Array<T> {
    mapAsync<U>(
      callbackfn: (value: T, index: number, array: T[]) => Promise<U>,
    ): Promise<U[]>
    filterAsync(
      callbackfn: (value: T, index: number, array: T[]) => Promise<boolean>,
    ): Promise<T[]>
    removeIf(predicate: (value: T, index: number, obj: T[]) => unknown): boolean
    chunk<N extends number>(size: N): Array<Tuple<T, N>>
    underslice(offset: number): T[]
  }
  interface Number {
    map(
      fromMin: number,
      fromMax: number,
      toMin?: number,
      toMax?: number,
    ): number
  }
  interface String {
    explain(placeholders: Record<string, string>): string
  }
}
