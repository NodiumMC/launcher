import { StyleFn } from './style-fn'

export type PropSelector<P, V> = keyof P | ((props: P) => V)

type BooleanMatch<P> = {
  true?: StyleFn<P>
  false?: StyleFn<P>
}

type MatchObject<P, S> = S extends boolean ? BooleanMatch<P> : { [K in NonNullable<S> as any]?: StyleFn<P> }

function extractPropFromSelector<P, S>(props: P, selector: PropSelector<P, S>): S {
  if (typeof selector === 'function') {
    return selector(props)
  }

  return props[selector as keyof P] as S
}

export function variants<P = any, V = any>(selector: PropSelector<P, V>, match: MatchObject<P, V>): StyleFn<P> {
  return ((props: P) => {
    const prop = extractPropFromSelector(props, selector)

    const variant = match[prop] as any

    return variant?.(props)
  }) as StyleFn<P>
}

export function ifProp<P = any, V = any>(selector: PropSelector<P, V>, then: StyleFn<P>, or?: StyleFn<P>) {
  return variants<P>(props => !!extractPropFromSelector(props, selector), {
    true: then,
    false: or,
  })
}

export function ifNotProp<P = any, V = any>(selector: PropSelector<P, V>, then: StyleFn<P>) {
  return variants(props => !!extractPropFromSelector(props, selector), {
    false: then,
  })
}
