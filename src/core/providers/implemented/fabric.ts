import { mergeVersions, VersionFile } from 'core/version'
import { FabricLoadersManifest, FabricManifest, VersionUnion } from 'core/providers/types'
import { Vanilla } from 'core/providers/implemented/vanilla'
import { fabricLoaders, fabricManifest, fabricVersion } from 'core/providers/endpoints'
import { isOld, isRelease, isSnapshot } from 'core/utils'

export class Fabric extends Vanilla {
  private async fetchFabricManifest(): Promise<FabricManifest> {
    return fetch(fabricManifest).then(v => v.json())
  }

  async json(id: string, lv: string): Promise<VersionFile> {
    const mojang = await super.json(id)
    const fabricVersions = await this.versions()
    if (!fabricVersions.some(v => v.id === id)) throw new Error(`Version ${id} doesn't exists`)
    const fabricLoadersManifest: FabricLoadersManifest = await fetch(fabricLoaders.explain({ id })).then(v => v.json())
    const loader = fabricLoadersManifest[0].loader.version
    const fabric: VersionFile = await fetch(fabricVersion.explain({ id, loader })).then(v => v.json())
    return mergeVersions(mojang, fabric)
  }

  async versions(): Promise<VersionUnion[]> {
    const mojangManifest = await this.fetchManifest()
    const fabricManifest = await this.fetchFabricManifest()
    return fabricManifest.map(v => ({
      id: v.version,
      name: v.version,
      isRelease: isRelease(v.version),
      isOld: isOld(v.version),
      isSnapshot: isSnapshot(v.version),
      latest: mojangManifest.latest.release === v.version || mojangManifest.latest.snapshot === v.version,
    }))
  }
}
