import { LaunchOptions } from 'core'

export type InstanceSettings = Pick<LaunchOptions, 'alloc' | 'javaArgs' | 'javaExecutable' | 'minecraftArgs' | 'windowHeight' | 'windowWidth'>
