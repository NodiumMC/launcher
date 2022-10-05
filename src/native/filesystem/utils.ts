import { dataDir } from '@tauri-apps/api/path'
import { join, dirname } from 'native/path'
import { readDir, createDir, readTextFile, writeTextFile } from '@tauri-apps/api/fs'

export const exists = async (path: string) => {
  const dir = await readDir(dirname(path))
  return dir.some(v => v.path.includes(path))
}

export const readJsonFile = async <T>(path: string): Promise<T> => {
  return JSON.parse(await readTextFile(path))
}

export const writeJsonFile = async <T>(path: string, data: T): Promise<void> => {
  await writeTextFile(path, JSON.stringify(data))
}

const ddir = await dataDir()

export const AppData = async () => {
  const appdata = join(ddir, 'NodiumLauncher')
  if (!(await exists(appdata))) await createDir(appdata, { recursive: true })
  return appdata
}

export const GameDir = async () => {
  const gameDir = join(ddir, '.nodium')
  if (!(await exists(gameDir))) await createDir(gameDir, { recursive: true })
  return gameDir
}
