export const isPromise = <T>(possiblePromise: Awaitable<T>): possiblePromise is Promise<T> =>
  possiblePromise !== undefined &&
  possiblePromise !== null &&
  typeof possiblePromise === 'object' &&
  'finally' in possiblePromise
