export type FT = <T extends (args: Parameters<T>) => ReturnType<T>>(args: Parameters<T>) => ReturnType<T>
export type BlakeMap = Record<string, string>
