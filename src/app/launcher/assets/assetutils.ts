import { AssetIndex, AssetObject } from './type'
import { DownloadableResource } from '../dl/download'
import { join } from '@tauri-apps/api/path'
import { VersionFile } from '../version/version'
import { fetch } from '@tauri-apps/api/http'

export const compileAssets = async (objs: AssetObject[]): Promise<DownloadableResource[]> =>
  objs.mapAsync(async obj => ({
    url: `https://resources.download.minecraft.net/${obj.hash.substring(0, 2)}/${obj.hash}`,
    local: await join(await join('assets', 'objects'), obj.hash.substring(0, 2), obj.hash),
    size: obj.size,
  } as DownloadableResource))

export const fetchAssetIndex = async (version: VersionFile): Promise<AssetIndex> => {
  const res = await fetch<AssetIndex>(version.assetIndex.url, { timeout: 5000, method: 'GET' })
  return res.data
}

export const compileAssetIndex = async (version: VersionFile, gameDataDir: string): Promise<DownloadableResource[]> => {
  const batch: DownloadableResource[] = [{...version.assetIndex, local: await join(gameDataDir, 'assets', 'indexes', `${version.assets}.json`)}]
  const index = await fetchAssetIndex(version)
  const objects = Object.values(index.objects)
  const compiled = await compileAssets(objects)
  const located = await compiled.mapAsync(async v => ({...v, local: await join(gameDataDir, v.local)}))
  batch.push(...located)
  return batch
}
