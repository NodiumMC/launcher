import { autoInjectable } from 'tsyringe'
import { CentralConfig } from 'config/CentralConfig.service'

@autoInjectable()
export class Repository<T> {
  constructor(private readonly cc?: CentralConfig) {}
  get data(): T {
    if (!this.cc?.data) throw new Error('Central config used before initialized')
    return this.cc?.data as unknown as T
  }

  async save() {
    if (!this.cc) throw new Error('Central config used before initialized')
    await this.cc.save()
  }
}
