import { error } from 'error'

export const FetchManifestException = error('FetchManifestException', t => t.minecraft.install.fetch_manifest_exception)
