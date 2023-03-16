import { nanoid } from 'nanoid/non-secure'

export function keygen() {
  return nanoid(8)
}
