export interface SelfHandlingException extends Error {
  handler(error: this): void
}
