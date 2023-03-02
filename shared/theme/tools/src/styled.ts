import {
  theme as _theme,
  prop as _prop,
  ifProp as _ifProp,
  ifNotProp as _ifNotProp,
  switchProp as _switchProp,
  withProp as _withProp,
} from 'styled-tools'

function transform<T extends (...args: any) => any>(fn: T): Transform<T> {
  return ((path: () => string, ...rest: any[]) => fn(path(), ...rest)) as Transform<T>
}

type Transform<T> = T extends (path: infer _, ...rest: infer U) => infer R
  ? (path: () => string, ...rest: U) => R
  : never

export const theme = transform(_theme)
export const prop = _prop
export const ifProp = _ifProp
export const ifNotProp = _ifNotProp
export const switchProp = _switchProp
export const withProp = _withProp
