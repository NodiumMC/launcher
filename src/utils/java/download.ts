export const version = '18'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const javaSources: any = {
  win32: {
    x64: `https://download.oracle.com/java/${version}/latest/jdk-${version}_windows-x64_bin.zip`,
  },
  linux: {
    x64: `https://download.oracle.com/java/${version}/latest/jdk-${version}_linux-x64_bin.tar.gz`,
    aarch64: `https://download.oracle.com/java/${version}/latest/jdk-${version}_linux-aarch64_bin.tar.gz`,
  },
}
