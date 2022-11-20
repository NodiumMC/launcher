import { dataDir } from '@tauri-apps/api/path'
import { join } from 'native/path'
import { createDir, exists as fsExists, readTextFile, writeTextFile } from '@tauri-apps/api/fs'
import JSON5 from 'json5'

export const exists = async (path: string) => {
  return fsExists(path)
}

export const readJsonFile = async <T>(path: string): Promise<T> => {
  return JSON.parse(await readTextFile(path))
}

export const writeJsonFile = async <T>(path: string, data: T): Promise<void> => {
  await writeTextFile(path, JSON.stringify(data))
}

export const readJson5File = async <T>(path: string): Promise<T> => {
  try {
    return JSON5.parse(await readTextFile(path))
  } catch (e) {
    return readJson5File(path)
  }
}

export const writeJson5File = async <T>(path: string, data: T): Promise<void> => {
  await writeTextFile(path, JSON5.stringify(data))
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
