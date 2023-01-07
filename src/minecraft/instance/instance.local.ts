import type { PublicVersion } from 'core/providers/types'
import type { SupportedProviders } from 'core/providers'
import type { LogEvent } from 'core/logging'
import type { InstanceLocalType, InstanceSettings } from './instance.types'
import { action, makeObservable, observable, toJS } from 'mobx'
import { DynamicService } from 'positron'

@DynamicService
export class InstanceLocal {
  static dyn() {
    return new this()
  }

  @observable name: string = null!
  @observable nid: string = null!
  @observable version: PublicVersion = null!
  @observable provider: SupportedProviders = null!
  @observable installed: boolean = null!
  @observable settings: InstanceSettings = null!
  @observable logs: LogEvent[] = null!
  @observable lastUsed: number = null!

  constructor() {
    makeObservable(this)
  }

  @action
  updateLastUsed() {
    this.lastUsed = Date.now()
  }

  @action
  copy(other: InstanceLocalType | InstanceLocal) {
    this.name = other.name
    this.nid = other.nid
    this.version = other.version
    this.provider = other.provider
    this.installed = other.installed
    this.settings = other.settings
    this.logs = other.logs
    this.lastUsed = other.lastUsed
  }

  toJSON(): InstanceLocalType {
    return {
      name: this.name,
      nid: this.nid,
      version: toJS(this.version),
      provider: this.provider,
      installed: this.installed,
      settings: toJS(this.settings),
      logs: toJS(this.logs),
      lastUsed: this.lastUsed,
    }
  }
}
