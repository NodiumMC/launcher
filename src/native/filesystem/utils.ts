import { dataDir, join, dirname } from '@tauri-apps/api/path'
import {
  readDir,
  createDir,
  readTextFile,
  writeTextFile,
} from '@tauri-apps/api/fs'

export const exists = async (path: string) => {
  const dir = await readDir(await dirname(path))
  return dir.some(v => v.path.includes(path))
}

export const readJsonFile = async <T>(path: string): Promise<T> => {
  return JSON.parse(await readTextFile(path))
}

export const writeJsonFile = async <T>(
  path: string,
  data: T,
): Promise<void> => {
  await writeTextFile(path, JSON.stringify(data))
}

export const AppData = async () => {
  const appdata = await join(await dataDir(), 'NodiumLauncher')
  if (!(await exists(appdata))) await createDir(appdata, { recursive: true })
  return appdata
}

export const GameDir = async () => {
  const gameDir = await join(await dataDir(), '.nodium')
  if (!(await exists(gameDir))) await createDir(gameDir, { recursive: true })
  return gameDir
}