import { execute } from '@native/tools'
import { readTextFile, writeTextFile } from '@tauri-apps/api/fs'

export async function readFile(path: string) {
  return execute(() => readTextFile(path))
}

export async function writeFile(path: string, data: string) {
  return execute(() => writeTextFile(path, data))
}
