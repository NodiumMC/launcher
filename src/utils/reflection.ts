export const namedClass = <T extends object>(constructor: T, name: string): T => {
  Reflect.defineProperty(constructor, 'name', { writable: false, value: name })
  return constructor
}
