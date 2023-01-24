import { join } from 'native/path'

export const injectorPath = (gameDataDir: string) =>
  join(gameDataDir, 'libraries', ...'moe/yushi/authlibinjector/1.2.1/authlib-injector-1.2.1.jar'.split('/'))
