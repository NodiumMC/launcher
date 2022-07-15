import { readDir } from '@tauri-apps/api/fs'

export const locateProfiles = async (instancesDir: string) => {
  const instances = await readDir(instancesDir)
  const profiles = await instances.filter(i => !!i.children && i.children.length > 0).mapAsync(async i => {
    const ifiles = await readDir(i.path)
    return ifiles.find(f => f.name === 'launcher_profiles.json' && !i.children)?.path
  })
  return profiles.filter(p => !!p) as string[]
}
