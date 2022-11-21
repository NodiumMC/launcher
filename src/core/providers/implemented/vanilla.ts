import { Provider } from 'core/providers/Provider'
import { VersionFile } from 'core/version'
import { mojangManifest } from 'core/providers/endpoints'
import { MojangManifest, VersionUnion } from 'core/providers/types'
import { isOld, isRelease, isSnapshot } from 'core/utils'

export class Vanilla implements Provider {
  readonly vanilla = true

  protected fetchManifest(): Promise<MojangManifest> {
    return fetch(mojangManifest).then(res => res.json())
  }

  async json(id: string, ...other: string[]): Promise<VersionFile> {
    const manifest = await this.fetchManifest()
    const version: any = manifest.versions.find(v => v.id === id)
    return fetch(version.url).then(v => v.json())
  }

  async versions(): Promise<VersionUnion[]> {
    const manifest = await this.fetchManifest()
    const latestRelease = manifest.latest.release
    const latestSnapshot = manifest.latest.snapshot
    return manifest.versions.map(v => ({
      id: v.id,
      name: v.id,
      latest: v.id === latestRelease || v.id === latestSnapshot,
      isSnapshot: isSnapshot(v.id),
      isRelease: isRelease(v.id),
      isOld: isOld(v.id),
    }))
  }
}
