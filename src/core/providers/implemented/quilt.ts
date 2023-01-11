import { mergeVersions, VersionFile } from 'core/version'
import { fetchQuiltLoaders, fetchQuiltManifest, Provider } from '..'
import { quiltVersion } from '../endpoints'
import { fetch } from '@tauri-apps/api/http'

export const quilt: Provider = async (id, loader?: string) => {
  const quiltManifest = await fetchQuiltManifest()
  const quiltVersions = quiltManifest.map(v => v.version)
  if (!quiltVersions.some(v => v === id)) throw new Error(`Version ${id} isn't supported by Quilt mod loader`)
  const quilt = await fetch<VersionFile>(
    quiltVersion.explain({ id, loader: loader ?? (await fetchQuiltLoaders(id).then(v => v[0].loader.version)) }),
  ).then(v => v.data)
  return mergeVersions(quilt)
}
