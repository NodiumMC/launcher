import { execute } from '@native/tools'
import { readTextFile, writeTextFile, exists as _exists, createDir as _createDir } from '@tauri-apps/api/fs'

export async function exists(path: string) {
  return execute(() => _exists(path))
}

export async function notExists(path: string) {
  return execute(() => _exists(path).then((v) => !v))
}

export async function createDir(path: string, recursive = false) {
  return execute(() => _createDir(path, { recursive }))
}

export async function readFile(path: string) {
  return execute(() => readTextFile(path))
}

export async function writeFile(path: string, data: string) {
  return execute(() => writeTextFile(path, data))
}

export async function readJsonFile<T>(path: string): Promise<T> {
  return execute(() => readTextFile(path).then(JSON.parse))
}

export async function writeJsonFile(path: string, data: any) {
  return execute(() => writeTextFile(path, JSON.stringify(data, null, 2)))
}
