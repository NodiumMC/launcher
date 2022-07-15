import { VersionFile } from '../version/version'
import { isPartialLib, populateLib } from '../utils/libutils'

export const populate = async (version: VersionFile, _retries = 0) => {
  const populated = await version.libraries.mapAsync(async lib => isPartialLib(lib) ? await populateLib(lib) : lib)
  return {
    ...version,
    libraries: populated
  }
}
