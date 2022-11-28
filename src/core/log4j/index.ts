import { VersionFile } from 'core/version'
import { Resource } from 'network'
import { join } from 'native/path'

export const log4jConfig = (version: VersionFile, clientDir: string): Resource => ({
  url: version.logging.client.file.url,
  local: join(clientDir, version.logging.client.file.id)
})

export const log4jArgument = (version: VersionFile, clientDir: string): string =>
  version.logging.client.argument.replaceAll('${path}', join(clientDir, version.logging.client.file.id))
