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
    if (storage.has(group)) setState(storage.get([group, memoId].join('.')))
  })

  useEffect(() => {
    if (!memoId) return
    storage.set([group, memoId].join('.'), state)
  }, [state])

  return [state, setState]
}
