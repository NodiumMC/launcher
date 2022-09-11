import { AssetIndex, AssetObject } from 'core'
import { DownloadableResource } from 'core'
import { join } from 'native/path'
import { VersionFile } from 'core'
import { fetch } from '@tauri-apps/api/http'

export const compileAssets = (objs: AssetObject[]): DownloadableResource[] => {
  const assetObjects = join('assets', 'objects')
  return objs.map(
    obj =>
      ({
        url: `https://resources.download.minecraft.net/${obj.hash.substring(
          0,
          2,
        )}/${obj.hash}`,
        local: join(assetObjects, obj.hash.substring(0, 2), obj.hash),
        size: obj.size,
      } as DownloadableResource),
  )
}

export const fetchAssetIndex = async (
  version: VersionFile,
): Promise<AssetIndex> => {
  const res = await fetch<AssetIndex>(version.assetIndex.url, {
    timeout: 5000,
    method: 'GET',
  })
  return res.data
}

export const compileAssetIndex = async (
  version: VersionFile,
  gameDataDir: string,
): Promise<DownloadableResource[]> => {
  const batch: DownloadableResource[] = [
    {
      ...version.assetIndex,
      local: join(gameDataDir, 'assets', 'indexes', `${version.assets}.json`),
    },
  ]
  const index = await fetchAssetIndex(version)
  const objects = Object.values(index.objects)
  const compiled = compileAssets(objects)
  const located = compiled.map(v => ({
    ...v,
    local: join(gameDataDir, v.local),
  }))
  batch.push(...located)
  return batch
}
