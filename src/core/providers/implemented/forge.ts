import { fetchForgeLoaders, Provider } from '..'
import { forgeVersion } from 'core/providers/endpoints'
import { Rdownload, RunzipReadSingle } from 'native/rust'
import { join } from 'native/path'
import { APP_DATA } from 'native/filesystem'
import { exists, removeFile } from '@tauri-apps/api/fs'
import { VersionFile } from 'core/version'
import { mapErr } from 'error'
import { FetchManifestException } from 'core/providers/exceptions'
import { cache } from 'storage'

export const forge: Provider = async (id: string, loader?: string): Promise<VersionFile> => {
  loader ||= await fetchForgeLoaders(id).then(res => res.first)
  const cacheKey = `provider-forge-${id}-${loader}`
  const candidate = await cache.getItem<VersionFile>(cacheKey)
  if (candidate) return candidate
  const jarUrl = forgeVersion.explain({
    version: id,
    loader: loader!,
  })
  const downloadPath = join(APP_DATA, 'installer.zip')
  try {
    await Rdownload(jarUrl, downloadPath)
    const json = JSON.parse(await RunzipReadSingle(downloadPath, 'version.json'))
    await removeFile(downloadPath)
    await cache.setItem(cacheKey, json)
    return json
  } catch (e) {
    if (await exists(downloadPath)) await removeFile(downloadPath)
    throw mapErr(FetchManifestException)(e)
  }
}
