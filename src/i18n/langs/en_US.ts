import type { Lang } from 'i18n'

export default {
  preload: {
    loading: 'Loading',
    updating: 'Updating',
  },
  appearance: {
    theme_changed: 'Theme changed',
  },
  throws: {
    missing_jvm_executable: 'There is no Java executable file',
    unsupported_platform: 'The current system is not supported',
    unsupported_arch: 'The {arch} architecture is not supported',
    invalid_jdk_version: 'Incorrect JDK version',
    no_compatible_jdks: 'There is no compatible JDK. Try to fix an instance and redo the installation',
    no_game_profiles_selected: 'No profile is selected',
    launch_requires_installation: 'Running it requires an actual installation. Try fixing the instance and repeating',
    unable_to_launch_more_once: 'Cannot run more than one process per instance',
    unknown_provider: 'Unknown provider',
    no_version_selected: 'Version not selected',
    missing_version_manifest: 'No version manifest',
    nothing_to_stop: "There's nothing to stop",
    jvm_install_failed: 'Failed to install Java',
    minecraft_assets_download_failed: 'Failed to install Minecraft',
    unpack_natives_failed: 'Failed to unpack some files',
  },
  minecraft: {
    versions: {
      not_found: 'Nothing found',
      fetching_versions: 'Wait a little while, maybe it will be soon.',
      release_type: 'Release',
      snapshot_type: 'Snapshot',
      latest_type: 'Latest',
    },
    instance: {
      name: 'Name',
      name_required: 'Name required',
      name_too_long: 'The name is too long',
      name_invalid_pattern: 'The name contains illegal characters',
      window_size: 'Window size',
      jvm_args: 'JVM arguments',
      invalid_args_string: 'Incorrect argument string',
      minecraft_args: 'Minecraft arguments',
      save: 'Save',
      create: 'Create',
      instance_fixed: 'The instance will be fixed at the next launch',
      are_you_sure: 'Are you sure?',
      are_you_want_to_delete:
        'Do you really want to delete an instance of the game? This action will only delete the instance profile. To completely delete the game data, select the appropriate action.',
      full_delete: 'Delete completely',
      cancel: 'Cancel',
      remove: 'Remove',
      network_error: 'Network error. Check your Internet connection',
      install_failed: 'Installation failed',
      launch_failed: 'Launch failed',
    },
  },
  journal: {
    no_logs: 'No logs',
  },
  play: {
    nickname: 'Nickname',
  },
  settings: {
    general: 'General settings',
    path_to_gamedir: 'Path to game data',
    appearance: 'Appearance',
    lang: 'Language',
    theme: 'Theme',
    jdks: 'Java Runtimes',
    no_jdks: 'Java is not installed',
  },
  other: {
    launcher_crashed:
      'The launcher crashed with a critical error. Wait until the error report is generated, and then the launcher will restart. Try to figure out what caused the error and report it to the developer or administration',
  },
} as Lang