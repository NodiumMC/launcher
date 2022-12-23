import { VersionFile } from 'core'
import { isPartialLib, populateLib } from 'core'
import { resolveInheritance } from 'core/utils/inheritance'
import { dedupe } from 'core/utils/dedupe'

export const populate = async (version: VersionFile) => {
  const populated = await version.libraries.mapAsync(async lib => (isPartialLib(lib) ? await populateLib(lib) : lib))
  return dedupe(
    await resolveInheritance({
      ...version,
      libraries: populated,
    }),
  )
}
