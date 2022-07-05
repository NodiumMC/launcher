import { Observable } from 'rxjs'
import { DownloadProgress, r_download } from '../bridge/download'
import { arch, platform } from '../os/info'
import { join } from '@tauri-apps/api/path'
import { GameDir } from '../filesystem/utils'

const version = '18'
const javaSources: any = {
  win32: {
    x64: `https://download.oracle.com/java/${version}/latest/jdk-${version}_windows-x64_bin.zip`,
  },
  linux: {
    x64: `https://download.oracle.com/java/${version}/latest/jdk-${version}_linux-x64_bin.tar.gz`,
    aarch64: `https://download.oracle.com/java/${version}/latest/jdk-${version}_linux-aarch64_bin.tar.gz`,
  },
}

export const downloadJava = (path: string): Observable<DownloadProgress> => new Observable<DownloadProgress>(subscriber => {
  ;(async () => {
    const $platform = await platform()
    const $arch = await arch()
    const target = javaSources?.[$platform]?.[$arch]
    if(!target) return subscriber.error(new Error(`Unsupported platform or arch: ${$platform} ${$arch}`))
    r_download({
      url: target,
      local: await join(await GameDir(), 'jdk.zip'),
    }).subscribe(subscriber)
  })()
})
