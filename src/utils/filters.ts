export const NonNullFilter = <T>(value: T | undefined): value is T => value !== undefined && value !== null

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest

  describe('Non-null filter', () => {
    it.concurrent('Should filters null types', () => {
      expect([0, 1, null, 2, undefined].filter(NonNullFilter)).toStrictEqual([0, 1, 2])
      expect([undefined, undefined].filter(NonNullFilter)).toStrictEqual([])
      expect([null, undefined].filter(NonNullFilter)).toStrictEqual([])
      expect([undefined, false].filter(NonNullFilter)).toStrictEqual([false])
      expect([false, true].filter(NonNullFilter)).toStrictEqual([false, true])
    })
  })
}
