import { compileAssetIndex, compileLibraries, readVersionFile } from 'core'
import { join } from 'native/path'

export const compileLocal = async (vid: string, clientDir: string, gameDataDir: string) => {
  const version = await readVersionFile(join(clientDir, `${vid}.json`))
  const libs = compileLibraries(version.libraries, gameDataDir, clientDir)
  const assets = await compileAssetIndex(version, gameDataDir)
  return [...libs, ...assets, { ...version.downloads.client, local: join(clientDir, `${vid}.jar`) }]
}
