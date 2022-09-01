import { LaunchOptions } from 'core'

export interface InstanceSettings extends Pick<LaunchOptions, 'alloc' | 'javaArgs' | 'javaExecutable' | 'minecraftArgs' | 'windowHeight' | 'windowWidth'> {
  vid: string
  name: string
}
