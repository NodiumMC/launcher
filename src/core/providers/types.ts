export interface VersionUnion {
  name: string
  id: string
  isRelease: boolean
  isSnapshot: boolean
  isOld: boolean
  latest: boolean
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
