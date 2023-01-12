import { fabricVersion } from 'core/providers/endpoints'
import { VersionFile } from 'core/version'
import { fetchFabricLoaders, fetchFabricManifest, Provider } from '..'
import { fetch } from '@tauri-apps/api/http'

export const fabric: Provider = async (id, loader?: string) => {
  const fabricManifest = await fetchFabricManifest()
  const fabricVersions = fabricManifest.map(v => v.version)
  if (!fabricVersions.some(v => v === id)) throw new Error(`Version ${id} isn't supported by Fabric mod loader`)
  return await fetch<VersionFile>(
    fabricVersion.explain({ id, loader: loader ?? (await fetchFabricLoaders(id).then(v => v[0].loader.version)) }),
  ).then(v => v.data)
}
