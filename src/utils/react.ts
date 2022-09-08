import { ChangeAction } from 'utils/UtilityProps'
import { ChangeEvent } from 'react'

export const inputValue =
  <T>(action: ChangeAction<T>) =>
  (e: ChangeEvent<HTMLInputElement>) =>
    action(e.target.value as T)
