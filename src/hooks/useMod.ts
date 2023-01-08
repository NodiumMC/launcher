import { container } from '@nodium/tsyringe'

export function useMod<T>(module: new (...args: any[]) => T): T {
  return container.resolve(module)
}
