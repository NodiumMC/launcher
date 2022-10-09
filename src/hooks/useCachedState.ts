import { useModule } from 'mobmarch'
import { PersistentCacheService } from 'storage'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useOnce } from 'hooks/useOnce'

export const useCachedState = <T>(
  group: string,
  memoId?: string,
): [T | undefined, Dispatch<SetStateAction<T | undefined>>] => {
  const storage = useModule(PersistentCacheService)

  const [state, setState] = useState<T | undefined>()

  useOnce(() => {
    if (!memoId) return
    storage.data[group] = storage.data[group] ?? {}
    if (storage.data[group][memoId]) setState(storage.data[group][memoId])
  })

  useEffect(() => {
    if (!memoId) return
    storage.data[group][memoId] = state
  }, [state])

  return [state, setState]
}
