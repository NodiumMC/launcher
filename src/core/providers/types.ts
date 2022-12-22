import { SupportedProviders } from 'core/providers/providers'

export interface VersionUnion {
  name: string
  id: string
  isRelease?: boolean
  isSnapshot?: boolean
  isOld?: boolean
  latest?: boolean
  providers: SupportedProviders[]
}

export interface MojangManifest {
  latest: {
    release: string
    snapshot: string
  }
  versions: {
    id: string
    type: 'release' | 'snapshot'
    url: string
  }[]
}

export type FabricManifest = Array<{
  version: string
}>

export type FabricLoadersManifest = Array<{
  loader: {
    version: string
  }
}>
