import { RUnzipProgress } from 'app/bridge/R/unzip'
import { RDownloadProgress } from 'app/bridge/R/download'
import { readVersionFile } from '../version/version'
import { createDir } from '@tauri-apps/api/fs'
import { join } from '@tauri-apps/api/path'
import { compileLibraries } from '../utils/libutils'
import { compileAssetIndex } from '../assets/assetutils'
import { BlakeMap } from '../utils/types'
import EventEmitter from 'eventemitter3'
import { batchDownload } from '../dl/download'
import { unzipNatives } from './unzipNatives'

export interface InstallOptions {
  clientDir: string
  gameDataDir: string
  blakemap: BlakeMap
}

export interface VersionInstallEvent {
  download: (progress: RDownloadProgress) => void
  unzip: (progress: RUnzipProgress) => void
  unit: (name: string, hash: string) => void
  done: () => void
  error: (e: Error) => void
}

export const install = async ({
  gameDataDir,
  clientDir,
  blakemap,
}: InstallOptions) => {
  const version = await readVersionFile(await join(clientDir, 'version.json'))
  const libs = await compileLibraries(version.libraries, gameDataDir, clientDir)
  const assets = await compileAssetIndex(version, gameDataDir)
  const batch = [
    ...libs,
    ...assets,
    { ...version.downloads.client, local: await join(clientDir, 'client.jar') },
  ]
  const hashAttachedBatch = batch.map(v => ({ ...v, hash: blakemap[v.local] }))
  const emitter = new EventEmitter<VersionInstallEvent>()
  const bdp = await batchDownload(hashAttachedBatch)
  bdp.on('progress', progress => emitter.emit('download', progress))
  bdp.on('error', e => emitter.emit('error', e))
  bdp.on('done', async () => {
    const nativesDir = await join(clientDir, 'natives')
    await createDir(nativesDir, { recursive: true })
    const unp = await unzipNatives(nativesDir)
    unp.on('progress', unzipProgress => emitter.emit('unzip', unzipProgress))
    unp.on('error', e => emitter.emit('error', e))
    unp.on('done', () => emitter.emit('done'))
  })
  bdp.on('unit', (name, hash) => emitter.emit('unit', name, hash))
  return emitter
}
