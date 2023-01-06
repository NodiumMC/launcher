export interface JvmRuntime {
  name: string
  major: number
}

export interface InstallProgress {
  stage: number
  total: number
  progress: number
}
