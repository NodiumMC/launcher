import { invoke } from '@tauri-apps/api'
import { nanoid } from 'nanoid/non-secure'
import EventEmitter from 'eventemitter3'
import { emit, listen } from '@tauri-apps/api/event'

interface Events {
  std: (data: string) => void
  error: (error: string) => void
  close: (code: number) => void
  kill: () => void
}

export class Child extends EventEmitter<Events> {
  kill() {
    this.emit('kill')
  }
}

export const spawn = async (binary: string, args: string[], cwd?: string) => {
  const std = nanoid(8)
  const errevent = nanoid(8)
  // const kill = nanoid()
  const close = nanoid(8)
  await invoke('spawn', { binary, args, cwd, std, errevent, close })
  const emitter = new Child()
  const uStd = await listen<string>(std, data => {
    emitter.emit('std', data.payload)
  })
  const uError = await listen<string>(errevent, err => emitter.emit('error', err.payload))
  const uClose = await listen<number>(close, err => {
    emitter.emit('close', err.payload)
    uStd()
    uError()
    uClose()
  })
  emitter.on('kill', () => {
    emit('kill')
    uStd()
    uError()
    uClose()
  })
  return emitter
}
