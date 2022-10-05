declare type FontWeightNumeric = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950

declare type FontWeightSemantic =
  | 'thin'
  | 'extralight'
  | 'light'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black'
  | 'extrablack'

declare type FontWeightLike = FontWeightSemantic | FontWeightNumeric

declare type FontSize = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl'
declare type FontSizeMap = Record<FontSize, string>
declare type FontSizeLike = string | FontSize
declare type ThreeLevel = 'low' | 'medium' | 'high'

declare namespace ExtraProps {
  declare interface HasChildren<T = any> {
    children?: T
  }

  declare interface Value<T> {
    value?: T
  }

  declare type ChangeAction<T, R = unknown> = (value: T) => R

  declare interface Changeable<T, R = unknown> {
    onChange?: ChangeAction<T, R>
  }

  declare type DataInput<T> = Value<T> & Changeable<T>

  declare interface Clickable {
    onClick?: () => void
  }

  declare interface Styled {
    className?: string
    style?: any
  }

  declare interface As {
    as?: string
  }
}

declare type Awaitable<T = any> = Promise<T> | T
declare type Nullable<T> = T extends object ? { [P in keyof T]: Nullable<T[P]> } : T | null | undefined

declare type FN = (...args: never[]) => unknown

type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TupleOf<T, N, [T, ...R]>
declare type Tuple<T, N extends number> = N extends N ? (number extends N ? T[] : _TupleOf<T, N, []>) : never
