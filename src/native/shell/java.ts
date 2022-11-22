import { Command } from '@tauri-apps/api/shell'

export const java = (args: string[], cwd?: string) => {
  return new Command('java', args, { cwd })
}
