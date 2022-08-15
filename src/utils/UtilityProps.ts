// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface HasChildren<T = any> {
  children?: T
}

export interface Value<T> {
  value?: T
}

export interface Changeable<T> {
  onChange?: (value: T) => void
}

export type DataInput<T> = Value<T> & Changeable<T>

export interface Clickable {
  onClick?: () => void
}

export interface Styled {
  className?: string
  style?: never
}

export interface As {
  as?: string
}
