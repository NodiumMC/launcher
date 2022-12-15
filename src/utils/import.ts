import { ComponentType, lazy as ReactLazy } from 'react'

export function lazy<T extends ComponentType<any>, I extends { [K2 in K]: T }, K extends keyof I>(
  factory: () => Promise<I>,
  name: K,
): I {
  return Object.create({
    [name]: ReactLazy(() => factory().then(module => ({ default: module[name] }))),
  })
}
