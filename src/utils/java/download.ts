import { Observable } from 'rxjs'
import { arch, platform } from 'native/os'
import { join } from 'native/path'
import { GameDir } from 'native/filesystem'
import { Rdownload, RDownloadProgress } from 'native/rust'

const version = '18'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const javaSources: any = {
  win32: {
    x64: `https://download.oracle.com/java/${version}/latest/jdk-${version}_windows-x64_bin.zip`,
  },
  linux: {
    x64: `https://download.oracle.com/java/${version}/latest/jdk-${version}_linux-x64_bin.tar.gz`,
    aarch64: `https://download.oracle.com/java/${version}/latest/jdk-${version}_linux-aarch64_bin.tar.gz`,
  },
}

export const downloadJava = () =>
  new Observable<RDownloadProgress>(subscriber => {
    ;(async () => {
      const $platform = platform
      const $arch = arch
      const target = javaSources?.[$platform]?.[$arch]
      if (!target)
        return subscriber.error(
          new Error(`Unsupported platform or arch: ${$platform} ${$arch}`),
        )
      const dp = await Rdownload(target, join(await GameDir(), 'jdk.zip'))
      dp.on('progress', subscriber.next.bind(subscriber))
      dp.on('done', subscriber.complete.bind(subscriber))
      dp.on('error', subscriber.error.bind(subscriber))
    })()
  })
