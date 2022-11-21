import { java } from 'native/shell'

export const javaMotd = async () =>
  java(['-version'])
    .execute()
    .then(v => v.stderr)

export interface JavaVersion {
  version: string | 'null'
  bit: string
  major: number
}

export const javaVersion = async (javaHome = 'java'): Promise<JavaVersion> => {
  const motd = await javaMotd()
  const version = motd.match(/version "(.*)"/)?.[1] ?? 'null'
  const bit = motd.match(/64-Bit/) ? 'x64' : 'x32'
  const major = +version.split('.')[0]
  return { version, bit, major }
}
