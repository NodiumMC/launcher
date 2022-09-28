export const isPromise = <T>(
  possiblePromise: Awaitable<T>,
): possiblePromise is Promise<T> =>
  possiblePromise !== undefined &&
  possiblePromise !== null &&
  'finally' in possiblePromise
