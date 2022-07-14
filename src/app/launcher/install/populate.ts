import { VersionFile } from '../version/version'
import { isPartialLib, populateLib } from '../utils/libutils'

export const populate = async (version: VersionFile, _retries = 0) => {
  const populated = await Promise.all(version.libraries.map(lib => isPartialLib(lib) ?  populateLib(lib) : lib))
  return {
    ...version,
    libraries: populated
  }
}
