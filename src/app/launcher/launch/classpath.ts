import { VersionFile } from '../version/version'
import { compileLibArtifacts } from '../utils/libutils'
import { join } from '@tauri-apps/api/path'

export const compileClasspath = async (
  versionFile: VersionFile,
  gameDataDir: string,
  clientDir: string,
): Promise<string[]> => {
  const [libs] = await compileLibArtifacts(versionFile.libraries)
  const client = await join(clientDir, 'client.jar')
  return [
    ...(await libs.mapAsync(
      async v => await join(gameDataDir, 'libraries', v.path),
    )),
    client,
  ]
}
