import { VersionFile } from 'core'
import { compileLibArtifacts } from 'core'
import { join } from '@tauri-apps/api/path'

export const compileClasspath = async (
  vid: string,
  versionFile: VersionFile,
  gameDataDir: string,
  clientDir: string,
): Promise<string[]> => {
  const [libs] = await compileLibArtifacts(versionFile.libraries)
  const client = await join(clientDir, `${vid}.jar`)
  return [
    ...(await libs.mapAsync(
      async v => await join(gameDataDir, 'libraries', v.path),
    )),
    client,
  ]
}
