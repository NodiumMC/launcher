export * from './providers'

import { VersionFile } from 'core/version'
import {
  FabricLoadersManifest,
  FabricManifest,
  MojangManifest,
  PublicVersion,
  QuiltLoadersManifest,
  QuiltManifest,
} from 'core/providers/types'
import { fabricLoaders, fabricManifest, mojangManifest, quiltLoaders, quiltManifest } from 'core/providers/endpoints'
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
export const fetchQuiltManifest = () => fetch<QuiltManifest>(quiltManifest).then(v => v.data)
export const fetchQuiltLoaders = (id: string) =>
  fetch<QuiltLoadersManifest>(quiltLoaders.explain({ id })).then(v => v.data)

export const fetchMinecraftVersions = async (): Promise<PublicVersion[]> => {
  const manifest = await fetchManifest()
  manifest.versions = manifest.versions.filter(v => !isOld(v.id))
  const latestRelease = manifest.latest.release
  const latestSnapshot = manifest.latest.snapshot
  const fabricManifest = await fetchFabricManifest()
  const quiltManifest = await fetchQuiltManifest()
  console.log(fabricManifest)
  return manifest.versions.map(v => {
    const providers: SupportedProviders[] = ['vanilla']
    if (fabricManifest.some(f => f.version === v.id)) providers.push('fabric')
    if (quiltManifest.some(f => f.version === v.id)) providers.push('quilt')
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
