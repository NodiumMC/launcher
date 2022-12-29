import { VersionFile } from 'core/version'

export const dedupe = (version: VersionFile): VersionFile => {
  return {
    ...version,
    libraries: version.libraries.filter(
      (v, i, a) =>
        a.findIndex(v2 => {
          return (
            v.name === v2.name &&
            v.downloads?.artifact.sha1 === v.downloads?.artifact.sha1 &&
            v.natives === v2.natives &&
            v.downloads?.classifiers === v2.downloads?.classifiers
          )
        }) === i,
    ),
  }
}
