export interface LogEvent {
  logger: string
  timestamp: number
  level: 'INFO' | 'WARN' | 'ERROR'
  thread: string
  message: string
  throwable?: string
}
