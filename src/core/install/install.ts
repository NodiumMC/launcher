import { compileAssetIndex, compileLibraries, readVersionFile } from 'core'
import { join } from 'native/path'
import { log4jConfig } from 'core/log4j'

export const compileLocal = async (vid: string, clientDir: string, gameDataDir: string) => {
  const version = await readVersionFile(join(clientDir, `${vid}.json`))
  const libs = compileLibraries(version.libraries, gameDataDir, clientDir)
  const maven = compileLibraries(version.mavenFiles ?? [], gameDataDir, clientDir)
  const assets = await compileAssetIndex(version, gameDataDir)
  const logging = version.logging?.client ? [log4jConfig(version, clientDir)] : []
  return [
    ...libs,
    ...maven,
    ...assets,
    ...logging,
    { ...version.downloads.client, local: join(clientDir, `${vid}.jar`) },
  ]
}
