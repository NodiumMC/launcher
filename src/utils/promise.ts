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
