import { fetchManifest, Provider } from '..'
import { fetch } from '@tauri-apps/api/http'
import { VersionFile } from 'core/version'

export const vanilla: Provider = async id => {
  const manifest = await fetchManifest()
  const version: any = manifest.versions.find(v => v.id === id)
  if (!version) throw new Error(`Unknown or invalid minecraft version: ${id}`)
  return fetch<VersionFile>(version.url).then(v => v.data)
}
