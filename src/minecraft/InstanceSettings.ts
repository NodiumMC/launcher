import { LaunchOptions } from 'core'

export interface InstanceSettings
  extends Partial<
    Pick<LaunchOptions, 'alloc' | 'javaArgs' | 'javaExecutable' | 'minecraftArgs' | 'windowHeight' | 'windowWidth'>
  > {
  vid: string
  name: string
}
