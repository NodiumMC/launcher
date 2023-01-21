export function map(value: number, fromMin: number, fromMax: number, toMin = 0, toMax = 100) {
  return ((value - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest

  describe('Math utils', () => {
    it.concurrent('basic use', () => {
      expect(map(25, 0, 50, 0, 100)).toBe(50)
      expect(map(15, 10, 20, 0, 1)).toBe(0.5)
    })

    it.concurrent('specific use', () => {
      expect(map(-1, 0, 1, 100, 200)).toBe(0)
    })
  })
}
