import { RUnzipProgress } from 'native/rust'
import { RDownloadProgress } from 'native/rust'
import { batchDownload, readVersionFile, unzipNatives } from 'core'
import { join } from 'native/path'
import { compileLibraries } from 'core'
import { compileAssetIndex } from 'core'
import { BlakeMap } from 'core'
import EventEmitter from 'eventemitter3'
import { createDir } from '@tauri-apps/api/fs'

export interface InstallOptions {
  vid: string
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

export const install = async (
  { vid, gameDataDir, clientDir, blakemap }: InstallOptions,
  signal: AbortSignal,
) => {
  const version = await readVersionFile(join(clientDir, `${vid}.json`))
  const libs = compileLibraries(version.libraries, gameDataDir, clientDir)
  const assets = await compileAssetIndex(version, gameDataDir)
  const batch = [
    ...libs,
    ...assets,
    { ...version.downloads.client, local: join(clientDir, `${vid}.jar`) },
  ]
  const hashAttachedBatch = batch.map(v => ({ ...v, hash: blakemap[v.local] }))
  const emitter = new EventEmitter<VersionInstallEvent>()
  const bdp = await batchDownload(hashAttachedBatch, signal)
  bdp.on('progress', progress => emitter.emit('download', progress))
  bdp.on('error', e => emitter.emit('error', e))
  bdp.on('done', async () => {
    const nativesDir = join(clientDir, 'natives')
    await createDir(nativesDir, { recursive: true })
    const unp = await unzipNatives(nativesDir)
    unp.on('progress', unzipProgress => emitter.emit('unzip', unzipProgress))
    unp.on('error', e => emitter.emit('error', e))
    unp.on('done', () => emitter.emit('done'))
  })
  bdp.on('unit', (name, hash) => emitter.emit('unit', name, hash))
  return emitter
}
