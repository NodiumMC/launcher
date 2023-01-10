export * from './providers'

import { VersionFile } from 'core/version'
import {
  FabricLoadersManifest,
  FabricManifest,
  ForgeManifest,
  MojangManifest,
  PublicVersion,
} from 'core/providers/types'
import { fabricLoaders, fabricManifest, forgeManifest, mojangManifest } from 'core/providers/endpoints'
import { isOld, isRelease } from 'core/utils'
import { SupportedProviders } from 'core/providers/providers'
import { fetch } from '@tauri-apps/api/http'

export type Provider = (...options: string[]) => Promise<VersionFile>

export interface ExtraOptions {
  name: string
  list: string[]
}

export interface VersionNode {
  extras: ExtraOptions[]
  json(o1?: string, o2?: string, o3?: string, o4?: string): Promise<VersionFile>
}

export const fetchManifest = () => fetch<MojangManifest>(mojangManifest).then(res => res.data)
export const fetchFabricManifest = () => fetch<FabricManifest>(fabricManifest).then(v => v.data)
export const fetchFabricLoaders = (id: string) =>
  fetch<FabricLoadersManifest>(fabricLoaders.explain({ id })).then(v => v.data)
export const fetchForgeManifest = () =>
  fetch<ForgeManifest>(forgeManifest).then(res => res.data.versions.map(v => v.requires[0].equals))
export const fetchForgeLoaders = () =>
  fetch<ForgeManifest>(forgeManifest).then(res => res.data.versions.map(v => v.version))

export const fetchMinecraftVersions = async (): Promise<PublicVersion[]> => {
  const manifest = await fetchManifest()
  manifest.versions = manifest.versions.filter(v => !isOld(v.id))
  const latestRelease = manifest.latest.release
  const latestSnapshot = manifest.latest.snapshot
  const fabricManifest = await fetchFabricManifest()
  const forgeManifest = await fetchForgeManifest()
  return manifest.versions.map(v => {
    const providers: SupportedProviders[] = ['vanilla']
    if (fabricManifest.some(f => f.version === v.id)) providers.push('fabric')
    if (forgeManifest.some(f => f === v.id)) providers.push('forge')
    return {
      id: v.id,
      name: v.id,
      latest: v.id === latestRelease || v.id === latestSnapshot,
      isSnapshot: !isRelease(v.id) && !isOld(v.id),
      isRelease: isRelease(v.id),
      isOld: isOld(v.id),
      providers,
    }
  })
}
