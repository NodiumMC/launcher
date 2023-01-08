import { InstanceLocal } from './instance.local'

export interface InstanceSettings {
  javaArgs?: string[]
  minecraftArgs?: string[]
  alloc?: number
  windowHeight?: number
  windowWidth?: number
}

export type InstanceLocalType = Omit<InstanceLocal, 'copy' | 'updateLastUsed' | 'toJSON'>

export interface LaunchOptions {
  vid: string
  javaExecutable?: string | ((major: number) => Awaitable<string | undefined>)
  javaArgs?: string[]
  minecraftArgs?: string[]
  gameDir: string
  gameDataDir: string
  alloc?: number
  clientDir: string
  username: string
  uuid?: string
  accessToken?: string
  windowHeight?: number
  windowWidth?: number
}
