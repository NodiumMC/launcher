import { VersionFile } from 'core'
import { isPartialLib, populateLib } from 'core'

export const populate = async (version: VersionFile) => {
  const populated = await version.libraries.mapAsync(async lib =>
    isPartialLib(lib) ? await populateLib(lib) : lib,
  )
  return {
    ...version,
    libraries: populated,
  }
}
