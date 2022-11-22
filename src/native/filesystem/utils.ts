import { dataDir } from '@tauri-apps/api/path'
import { dirname, join } from 'native/path'
import { createDir, exists as fsExists, readTextFile, writeTextFile } from '@tauri-apps/api/fs'
import JSON5 from 'json5'

export const exists = async (path: string) => {
  return fsExists(path)
}

export const prepare = async (path: string, isFile = false) => {
  if (!(await exists(path))) {
    await createDir(isFile ? dirname(path) : path, { recursive: true })
    if (isFile) await writeTextFile(path, '')
  }
  return path
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

export const AppData = async () => prepare(join(ddir, 'NodiumLauncher'))

export const GameDir = async () => prepare(join(ddir, '.nodium'))
