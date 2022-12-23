import { VersionFile } from 'core'
import { isPartialLib, populateLib } from 'core'
import { resolveInheritance } from 'core/utils/inheritance'

export const populate = async (version: VersionFile) => {
  const populated = await version.libraries.mapAsync(async lib => (isPartialLib(lib) ? await populateLib(lib) : lib))
  return resolveInheritance({
    ...version,
    libraries: populated,
  })
}
