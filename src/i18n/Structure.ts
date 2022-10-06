export interface Structure<I = string> {
  not_implemented: I
  loading: {
    loading: I
    initialization: I
    loading_storage: I
    updating: I
    reloading_profiles: I
  }
  install: {
    welcome: I
    select_lang: I
    continue: I
    downloading_java: I
  }
  error: {
    titles: {
      default: I
      oops: I
    }
    descriptions: {
      unknown: I
      java_install_failed: I
    }
  }
  appearance: {
    popup: {
      close: I
      continue: I
      cancel: I
      skip: I
      retry: I
    }
    theme: {
      reloading: I
    }
  }
  minecraft: {
    settings: I
    play: I
    instance: I
    profile: I
    profiles: I
    select_provider: I
    snapshots: I
    old: I
    version: I
    install: I
    already_installed: I
    please_wait_install: I
    version_install_failed: I
    version_install_successful: I
    added_new_version: I
    providers: {
      vanilla: I
      fabric: I
    }
  }
}
