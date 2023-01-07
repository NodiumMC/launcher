import { DynamicService } from 'positron'
import { InstanceLocal } from './instance.local'
import { parse } from 'core/logging'

@DynamicService
export class InstanceLogging {
  static dyn(local: InstanceLocal): InstanceLogging {
    return new (this as any)(local)
  }

  acc = ''

  constructor(private readonly local: InstanceLocal) {}

  push(data: string) {
    if (!data.includes('</log4j:Event>')) this.acc += data
    else {
      const parsed = parse(this.acc)
      this.local.logs.push(parsed)
      if (this.local.logs.length > 1000) this.local.logs.shift()
      this.acc = ''
    }
  }
}
