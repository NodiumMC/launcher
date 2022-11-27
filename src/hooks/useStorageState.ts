import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { main } from 'storage'
import { MainStorage } from 'storage/types'
import { useOnce } from 'hooks/useOnce'
import { autorun } from 'mobx'

export const useStorageState = <T extends keyof MainStorage>(
  key: T,
  defaultValue: Awaitable<MainStorage[T]>,
): [MainStorage[T], Dispatch<SetStateAction<MainStorage[T]>>] => {
  const [value, setValue] = useState<MainStorage[T]>(main[key] ?? defaultValue)

  useOnce(() => {
    autorun(() => {
      setValue(main[key])
    })
  })

  useEffect(() => {
    main[key] = value
  }, [value])

  return [value, setValue]
}
