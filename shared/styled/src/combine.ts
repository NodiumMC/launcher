import { StyleFn } from './style-fn'

export function combine(...funcs: Array<(...args: any[]) => any>): StyleFn {
  return (...args) => Object.assign({}, ...funcs.map(func => func(...args)))
}
