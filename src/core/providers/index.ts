export * from './providers'

import { VersionFile } from 'core/version'
import { FabricLoadersManifest, FabricManifest, MojangManifest, VersionUnion } from 'core/providers/types'
import { fabricLoaders, fabricManifest, mojangManifest } from 'core/providers/endpoints'
import { isOld, isRelease, isSnapshot } from 'core/utils'
import { SupportedProviders } from 'core/providers/providers'

export type Provider = (...options: string[]) => Promise<VersionFile>

export interface ExtraOptions {
  name: string
  list: string[]
}

export interface VersionNode {
  extras: ExtraOptions[]
  json(o1?: string, o2?: string, o3?: string, o4?: string): Promise<VersionFile>
}

export const fetchManifest = (): Promise<MojangManifest> => fetch(mojangManifest).then(res => res.json())
export const fetchFabricManifest = (): Promise<FabricManifest> => fetch(fabricManifest).then(v => v.json())
export const fetchFabricLoaders = (id: string): Promise<FabricLoadersManifest> =>
  fetch(fabricLoaders.explain({ id })).then(v => v.json())

export const fetchMinecraftVersions = async (): Promise<VersionUnion[]> => {
  const manifest = await fetchManifest()
  const latestRelease = manifest.latest.release
  const latestSnapshot = manifest.latest.snapshot
  const fabricManifest = await fetchFabricManifest()
  return manifest.versions.map(v => {
    const providers: SupportedProviders[] = ['vanilla']
    if (fabricManifest.some(f => f.version === v.id)) providers.push('fabric')
    return {
      id: v.id,
      name: v.id,
      latest: v.id === latestRelease || v.id === latestSnapshot,
      isSnapshot: isSnapshot(v.id),
      isRelease: isRelease(v.id),
      isOld: isOld(v.id),
      providers,
    }
  })
}
