import { error } from 'error'

/* eslint-disable max-len, prettier/prettier */

export const JVMInstallException = error('JVMInstallError', t => t.minecraft.install.jvm_install_failed)
export const PopulateManifestException = error('PopulateManifestException', t => t.minecraft.install.populate_manifest_failed)
export const AssetsInstallException = error('AssetsInstallException', t => t.minecraft.install.minecraft_assets_download_failed)
export const UnpackNativesException = error('UnpackNativesException', t => t.minecraft.install.unpack_natives_failed)
export const LaunchException = error('LaunchException', t => t.minecraft.launch.launch_failed)
export const MissingJVMException = error('MissingJVMException', t => t.minecraft.launch.no_compatible_jdks)
export const NeedsInstallationException = error('NeedsInstallationException', t => t.minecraft.launch.launch_requires_installation)
export const MissingJVMExecutable = error('MissingJVMExecutable', t => t.minecraft.launch.missing_jvm_executable)
export const MultipleProcessesException = error('MultipleProcessesException', t => t.minecraft.launch.unable_to_launch_more_once)
export const NetworkError = error('NetworkError', t => t.minecraft.install.network_error)
export const NoProfileException = error('NoProfileException',t => t.minecraft.versions.selected_profile_not_exists)
