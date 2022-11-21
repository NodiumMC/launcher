import { VersionFile } from 'core/version'
import { VersionUnion } from 'core/providers/types'

export interface Provider {
  readonly vanilla?: true
  versions(): Promise<VersionUnion[]>
  json(...args: string[]): Promise<VersionFile>
}
