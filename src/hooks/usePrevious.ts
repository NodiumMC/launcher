import { useEffect, useRef } from 'react'

export const usePrevious = <T>(value: T) => {
  const ref = useRef<T | null>(null)
  useEffect(() => void ref.current && (ref.current = value), [value])
  return ref.current ?? value
}
