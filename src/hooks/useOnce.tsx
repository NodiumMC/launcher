import { EffectCallback, useEffect } from 'react'

export const useOnce = (cb: EffectCallback) => {
  useEffect(cb, [])
}
