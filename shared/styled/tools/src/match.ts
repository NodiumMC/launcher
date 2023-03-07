import { Schema } from '@theme/types'
import { StyleFn } from './types'

export function If<Props, S>(selector: (props: Props & { theme: Schema }) => S) {
  return {
    then: (style: StyleFn) => (prop: S) => prop ? style : undefined,
    false: (style: StyleFn) => (prop: S) => prop ? undefined : style,
    variant: (variants: { [K in keyof S]: StyleFn }) => (prop: S) => variants[prop as keyof S],
  }
}

If(props => props.theme).true(() => ({

}))

const a = {
  true: 10,
  false: 20,
}
