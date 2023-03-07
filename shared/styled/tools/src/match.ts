import { StyleFn } from './types'

type Selector<T, S> = (props: T) => S

type BooleanMatch = {
  true?: StyleFn
  false?: StyleFn
}

type MatchObject<S> = S extends boolean ? BooleanMatch : { [K in S as any]?: StyleFn }

export function match<P = any, S = any>(selector: Selector<P, S>, match: MatchObject<S>) {
  return (props: P) => match[selector(props) as never]
}

export function ifProp<P = any, S = any>(selector: Selector<P, S>, then: StyleFn, or?: StyleFn) {
  return match(selector as Selector<P, boolean>, {
    true: then,
    false: or,
  })
}

export function ifNotProp<P = any, S = any>(selector: Selector<P, S>, then: StyleFn) {
  return match(selector as Selector<P, boolean>, {
    false: then,
  })
}
