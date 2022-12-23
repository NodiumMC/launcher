import { mergeVersions, VersionFile } from 'core/version'
import { vanilla } from 'core/providers/implemented'

export const resolveInheritance = async (version: VersionFile) => {
  if (!version.inheritsFrom) return version
  const parent = await vanilla(version.inheritsFrom)
  delete version.inheritsFrom
  return mergeVersions(parent, version)
}
