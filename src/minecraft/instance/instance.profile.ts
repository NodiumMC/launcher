import { DynamicService } from 'positron'
import { InstanceLocal } from './instance.local'
import { GameProfileModule } from 'minecraft/game-profile'
import { InstanceCommon } from './instance.common'
import * as providers from 'core/providers/implemented'

@DynamicService
export class InstanceProfile {
  static dyn(local: InstanceLocal, common: InstanceCommon): InstanceProfile {
    return new (this as any)(local, common)
  }

  constructor(
    private readonly local: InstanceLocal,
    private readonly common: InstanceCommon,
    private readonly gp: GameProfileModule,
  ) {}

  get exists() {
    return this.gp.has(this.common.versionId)
  }

  get profile() {
    return this.gp.find(this.common.versionId)
  }

  async create() {
    await this.gp?.create(
      providers[this.local.provider as keyof typeof providers],
      this.local.version,
      this.common.versionId,
      this.common.versionId,
    )
  }
}
