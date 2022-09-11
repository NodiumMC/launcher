import { VersionFile } from 'core'
import { compileLibArtifacts } from 'core'
import { join } from 'native/path'

export const compileClasspath = (
  vid: string,
  versionFile: VersionFile,
  gameDataDir: string,
  clientDir: string,
): string[] => {
  const [libs] = compileLibArtifacts(versionFile.libraries)
  const client = join(clientDir, `${vid}.jar`)
  return [...libs.map(v => join(gameDataDir, 'libraries', v.path)), client]
}
