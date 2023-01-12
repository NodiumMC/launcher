export const isPromise = <T>(possiblePromise: Awaitable<T>): possiblePromise is Promise<T> =>
  possiblePromise !== undefined &&
  possiblePromise !== null &&
  typeof possiblePromise === 'object' &&
  'finally' in possiblePromise

export const promise = <T = void>(
  executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => Awaitable<void>) => void,
) =>
  new Promise((r, j) => {
    const awaitable = executor(r, j)
    if (isPromise(awaitable)) awaitable.catch(j)
    return awaitable
  })

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest
  describe('Is Promise', () => {
    it.concurrent('Should return true for True promise', () => {
      expect(isPromise(Promise.resolve())).toBeTruthy()
    })
    it.concurrent('Should return false for promise like', () => {
      expect(isPromise({ then: () => null })).toBeFalsy()
    })
    it.concurrent('Should return false for non object value', () => {
      expect(isPromise(null)).toBeFalsy()
    })
  })

  describe('Promise constructor shortcut', () => {
    it.concurrent('Should resolve', () => {
      expect(promise<boolean>(r => r(true))).resolves.toBeTruthy()
    })
    it.concurrent('Should reject', () => {
      expect(promise((_, j) => j(false))).rejects.toBeFalsy()
    })
    it.concurrent('Should work with async executor', () => {
      expect(promise<boolean>(async r => r(true))).resolves.toBeTruthy()
    })
  })
}
