import { Service } from 'positron'
import { DelogLine } from 'screens/Main/DebugSubscreens/LogLine'
import { makeAutoObservable } from 'mobx'

@Service
export class DelogStore {
  delogs: DelogLine[] = []
  times: Record<string | symbol, number> = {}
  timers: Record<string | symbol, any> = {}
  descriptions: Record<string | symbol, string> = {}

  constructor() {
    makeAutoObservable(this)
  }
}
