export type BaseScale = 'sm' | 'md' | 'lg'
export type XsScale = 'xs' | BaseScale
export type XlScale = BaseScale | 'xl'
export type FullScale = XsScale | XlScale
export type XxlScale = FullScale | 'xxl'
export type XxsScale = 'xxs' | FullScale
export type ExtendedScale = XxlScale | XxsScale

export type ThemeRecord<K extends string, V = any> = Record<K, V>

export type Shade = 5 | 25 | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 | 975

type _Prefix<T extends number> = `_${T}`

export type ShadesRecord = Record<_Prefix<Shade>, string>
