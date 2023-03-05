import { StyleFn } from './types'

export const combine =
  (...funcs: Array<(...args: any[]) => any>): StyleFn =>
  (...args) =>
    Object.assign({}, ...funcs.map(func => func(...args)))
