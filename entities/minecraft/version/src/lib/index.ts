import type { ReleaseType, MinecraftVersion } from '../model'
import { $appLocation } from '@config/app-location'
import { readJsonFile, writeJsonFile, notExists, createDir } from '@native/fs'
import { join } from '@native/path'

interface ProfileVersion {
  lastVersionId: string
  name: string
  created: string
  icon: string
  type: ReleaseType
  lastUsed: string
}

interface LauncherProfile {
  profiles: Record<string, ProfileVersion>
}

export const FILENAME = 'launcher_profiles.json'

export function launcherProfilePath() {
  return join($appLocation.getState(), FILENAME)
}

export async function createEmptyProfile() {
  await createDir(launcherProfilePath(), true)
  await writeJsonFile(launcherProfilePath(), { profiles: {} })
}

export function makeProfiles(versions: MinecraftVersion[]): LauncherProfile {
  return {
    profiles: Object.fromEntries(
      versions.map((version) => [
        version.id,
        {
          lastVersionId: version.id,
          name: version.displayName,
          created: version.created,
          icon: version.icon,
          lastUsed: version.lastUsed,
          type: version.type,
        },
      ]),
    ),
  }
}

export async function fetchLocalMinecraftVersions(): Promise<MinecraftVersion[]> {
  if (await notExists(launcherProfilePath())) {
    await createEmptyProfile()
  }

  const { profiles } = await readJsonFile<LauncherProfile>(launcherProfilePath())

  return Object.values(profiles).map((prof) => ({
    id: prof.lastVersionId,
    displayName: prof.name,
    created: prof.created,
    icon: prof.icon,
    lastUsed: prof.lastUsed,
    type: prof.type,
  }))
}

export async function saveMinecraftVersions(versions: MinecraftVersion[]) {
  await writeJsonFile(launcherProfilePath(), makeProfiles(versions))
}
