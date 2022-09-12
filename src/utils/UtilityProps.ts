// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface HasChildren<T = any> {
  children?: T
}

export interface Value<T> {
  value?: T
}

export type ChangeAction<T, R = unknown> = (value: T) => R

export interface Changeable<T, R = unknown> {
  onChange?: ChangeAction<T, R>
}

export type DataInput<T> = Value<T> & Changeable<T>

export interface Clickable {
  onClick?: () => void
}

export interface Styled {
  className?: string
  style?: any
}

export interface As {
  as?: string
}
