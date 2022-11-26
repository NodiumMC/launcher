import { fabricVersion } from 'core/providers/endpoints'
import { mergeVersions, VersionFile } from 'core/version'
import { fetchFabricLoaders, fetchFabricManifest, Provider } from '..'
import { vanilla } from '.'

export const fabric: Provider = async (id, loader?: string) => {
  const mojang = await vanilla(id)
  const fabricManifest = await fetchFabricManifest()
  const fabricVersions = fabricManifest.map(v => v.version)
  if (!fabricVersions.some(v => v === id)) throw new Error(`Version ${id} isn't supported by Fabric mod loader`)
  const fabric: VersionFile = await fetch(
    fabricVersion.explain({ id, loader: loader ?? (await fetchFabricLoaders(id).then(v => v[0].loader.version)) }),
  ).then(v => v.json())
  return mergeVersions(mojang, fabric)
}
