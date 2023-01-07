import { InstanceLocal } from './instance.local'

export interface InstanceSettings {
  javaArgs?: string[]
  minecraftArgs?: string[]
  alloc?: number
  windowHeight?: number
  windowWidth?: number
}

export type InstanceLocalType = Omit<InstanceLocal, 'copy' | 'updateLastUsed' | 'toJSON'>
