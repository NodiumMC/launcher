import { fetch } from '@tauri-apps/api/http'
import { arch as narch, platform } from 'native/os'
import { w } from 'debug'

export interface AdoptiumPackage {
  checksum: string
  checksum_link: string
  download_count: number
  link: string
  metadata_link: string
  name: string
  size: string
}

export type JDKArch = 'x64' | 'aarch64' | 'ppc64le' | 's390x' | 'x32' | 'arm'
export type JDKOs = 'linux' | 'mac' | 'windows'

export interface AdoptiumBinary {
  architecture: JDKArch
  download_count: number
  heap_size: 'normal'
  image_type: 'jdk'
  jvm_impl: 'hotspot'
  os: JDKOs
  project: 'jdk'
  scm_ref: string
  updated_at: string
  package: AdoptiumPackage
}

export interface AdoptiumVersion {
  build: number
  major: number
  minor: number
  openjdk_version: string
  security: number
  semver: string
}

export interface AdoptiumJDK {
  binary: AdoptiumBinary
  release_link: string
  release_name: string
  vendor: string
  version: AdoptiumVersion
}

export async function fetchJDKMetadata(major: number) {
  return fetch<AdoptiumJDK[]>(`https://api.adoptium.net/v3/assets/latest/${Math.max(17, major)}/hotspot?image_type=jdk`)
}

function mapNativeInfo(): { os: JDKOs; arch: JDKArch } {
  let os: JDKOs
  switch (platform) {
    case 'win32':
      os = 'windows'
      break
    case 'darwin':
      os = 'mac'
      break
    case 'linux':
      os = 'linux'
      break
    default:
      w(t => t.unsupported_platform, `Unsupported platform: ${platform}`)
  }
  let arch: JDKArch
  switch (narch) {
    case 'x86_64':
      arch = 'x64'
      break
    case 'x86':
      arch = 'x32'
      break
    case 'arm':
      arch = 'arm'
      break
    case 'aarch64':
      arch = 'aarch64'
      break
    case 's390x':
      arch = 's390x'
      break
    default:
      w(t => t.unsupported_arch.explain({ arch: narch }), `Unsupported arch: ${narch}`)
  }
  return { os, arch }
}

export async function fetchNativeJDK(major: number) {
  const jdks = await fetchJDKMetadata(major)
  const { os, arch } = mapNativeInfo()
  const found = jdks.data.find(jdk => jdk.binary.os === os && jdk.binary.architecture === arch)
  if (!found) w(t => t.invalid_jdk_version, 'Invalid JDK version:')
  return found
}

export async function fetchNJDKAsset(major: number) {
  const nativeJdk = await fetchNativeJDK(major)
  return {
    size: nativeJdk.binary.package.size,
    url: nativeJdk.binary.package.link,
    name: nativeJdk.release_name,
  }
}
