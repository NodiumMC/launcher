export interface LaunchOptions {
  vid: string
  javaExecutable: string
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
