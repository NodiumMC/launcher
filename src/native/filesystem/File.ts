import { readTextFile, writeTextFile, createDir } from '@tauri-apps/api/fs'
import { GameDir, readJsonFile, writeJsonFile } from 'native/filesystem'
import { join } from 'native/path'

export class File {
  constructor(public readonly path: string) {}

  async create() {
    await this.mkdirs()
    await writeTextFile(await this.relativePath(), '')
  }

  private async relativePath() {
    return join(await GameDir(), this.path)
  }

  private async mkdirs() {
    await createDir(await this.relativePath(), { recursive: true })
  }

  async writeText(text: string) {
    await this.mkdirs()
    await writeTextFile(await this.relativePath(), text)
  }

  async writeJSON<T>(json: T) {
    await this.mkdirs()
    await writeJsonFile<T>(await this.relativePath(), json)
  }

  async readText() {
    return await readTextFile(await this.relativePath())
  }

  async readJSON<T>(): Promise<T> {
    return readJsonFile<T>(await this.relativePath())
  }
}
