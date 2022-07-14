import { readDir } from '@tauri-apps/api/fs'
import { join } from '@tauri-apps/api/path'

const matchRegex = /^jdk-(.+?)$/

export const findLocalJava = async (findAt: string, major?: number): Promise<string | undefined> => {
  const files = await readDir(findAt)
  for (const file of files) {
    const match = matchRegex.exec(file.name ?? 'unknown')
    if (match) {
      const version = match[1]
      const [majorVersion] = version.split('.').map(v => +v)
      if (!major || majorVersion === major) return join(findAt, file.name ?? 'unknown', 'bin', 'java')
    }
  }
}
