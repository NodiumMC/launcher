export interface JvmRuntime {
  name: string
  major: number
  location: string
}

export interface InstallProgress {
  stage: number
  total: number
  progress: number
}
