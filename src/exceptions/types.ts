export type ErrorHandler<T extends Error = Error> = (error: T) => void
export interface ErrorConstructor<T extends Error = Error> {
  new (...args: never[]): T
}
export type HandlingPair<T extends Error> = [ErrorConstructor, ErrorHandler<T>]
