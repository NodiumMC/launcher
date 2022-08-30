import { Module } from 'mobmarch'
import { VersionInstallService } from 'core/services/VersionInstall.service'
import { LoggingPool } from 'logging'
import { Instance } from 'minecraft/Instance'

type OmitLast2<T extends any[]> = T extends [ ...infer Head, any, any ] ? Head : any[];

@Module([VersionInstallService, LoggingPool])
export class InstanceFactory {
  constructor(
    private readonly pool: LoggingPool,
    private readonly installer: VersionInstallService,
  ) {}
  new(...args: OmitLast2<ConstructorParameters<typeof Instance>>): Instance {
    return new Instance(...args, this.pool, this.installer)
  }
}
