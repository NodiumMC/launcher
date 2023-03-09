import { StyleFn } from './types'

type Selector<T, S> = (props: T) => S

type BooleanMatch<P> = {
  true?: StyleFn<P>
  false?: StyleFn<P>
}

type MatchObject<P, S> = S extends boolean ? BooleanMatch<P> : { [K in NonNullable<S> as any]?: StyleFn<P> }

export function match<P = any, S = any>(selector: Selector<P, S>, match: MatchObject<P, S>) {
  return (props: P) => (match[selector(props) as never] as StyleFn<P>)?.(props as any)
}

export function ifProp<P = any, S = any>(selector: Selector<P, S>, then: StyleFn<P>, or?: StyleFn<P>) {
  return match(props => !!selector(props), {
    true: then,
    false: or,
  })
}

export function ifNotProp<P = any, S = any>(selector: Selector<P, S>, then: StyleFn<P>) {
  return match(props => !!selector(props), {
    false: then,
  })
}
