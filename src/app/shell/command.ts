import { platform } from '../os/info'
import { Command } from '@tauri-apps/api/shell'

export const command = async (command: string, args: string[], cwd?: string) => {
  const isWindows = await platform() === 'win32'
  let metaCmd = isWindows ? 'cmd' : 'sh'
  let metaArgs = isWindows ? ['/C'] : ['-c']
  return new Command(metaCmd, [...metaArgs, `${command} ${args.join(' ')}`], { cwd })
}
