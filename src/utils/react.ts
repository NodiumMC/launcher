import { ChangeEvent } from 'react'

export const inputValue =
  <T>(action: ExtraProps.ChangeAction<T>, numberic = false) =>
  (e: ChangeEvent<HTMLInputElement>) =>
    action((numberic ? +e.target.value : e.target.value) as T)
