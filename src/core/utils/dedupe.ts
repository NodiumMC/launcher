import { VersionFile } from 'core/version'

export const dedupe = (version: VersionFile): VersionFile => {
  return { ...version, libraries: version.libraries.filter((v, i, a) => a.findIndex(v2 => v2.name === v.name) === i) }
}
