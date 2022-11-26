import { fetchManifest, Provider } from '..'

export const vanilla: Provider = async id => {
  const manifest = await fetchManifest()
  const version: any = manifest.versions.find(v => v.id === id)
  if (!version) throw new Error(`Unknown or invalid minecraft version: ${id}`)
  return fetch(version.url).then(v => v.json())
}
