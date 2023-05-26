import { execute } from '@native/tools'
import { readTextFile, writeTextFile } from '@tauri-apps/api/fs'

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
