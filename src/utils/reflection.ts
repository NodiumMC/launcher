export const namedClass = <T extends object>(constructor: T, name: string): T => {
  Reflect.defineProperty(constructor, 'name', { writable: false, value: name })
  return constructor
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest

  describe('namedClass', () => {
    it('Should add name to class', () => {
      expect(namedClass(class {}, 'Test')).toHaveProperty('name', 'Test')
    })
  })
}
