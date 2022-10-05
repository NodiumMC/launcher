import { platform } from 'native/os'
import { Command } from '@tauri-apps/api/shell'

export const command = (command: string, args: string[], cwd?: string) => {
  const isWindows = platform === 'win32'
  const metaCmd = isWindows ? 'cmd' : 'sh'
  const metaArgs = isWindows ? ['/C'] : ['-c']
  // FIXME: fix this shit
  const fullArgs = [...metaArgs, `${command} ${args.filter(v => !v.includes('Dos')).join(' ')}`]
  return new Command(metaCmd, fullArgs, { cwd })
}
