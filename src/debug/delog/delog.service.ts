import { Service } from 'positron'
import { DelogStore } from 'debug/delog/delog.store'

@Service
export class DelogService {
  constructor(private readonly store: DelogStore) {}

  takeTime(description: string, key: string | symbol = Symbol()) {
    const start = performance.now()
    this.store.timers[key] = start
    this.store.descriptions[key] = description
    return () => this.endTime(key, start)
  }

  endTime(key: string | symbol, start?: number, description?: string) {
    const took = performance.now() - (start ?? this.store.timers[key])
    this.store.delogs.push({
      type: 'time',
      args: [description ?? this.store.descriptions[key]],
      id: performance.now(),
      time: took,
      delta: this.store.times[key] !== undefined ? took - this.store.times[key] : 0,
    })
    if (key) this.store.times[key] = took
  }
}
