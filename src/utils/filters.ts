export const NonNullFilter = <T>(value: T | undefined): value is T => value !== undefined && value !== null
