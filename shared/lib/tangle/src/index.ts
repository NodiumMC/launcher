const TANGLE_KEY = Symbol('entangled')

;(window as any)[TANGLE_KEY] ??= {}

const ENTANGUALTION_CONATINER = (window as any)[TANGLE_KEY]

export function entangulation(key: string | symbol) {
  return ENTANGUALTION_CONATINER[key]
}
