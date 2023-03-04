class NoIpcException extends Error {
  constructor() {
    super('Missing or undefined IPC')
  }
}

export async function execute<T extends (...args: any) => any>(command: T, noThrow?: boolean): Promise<ReturnType<T>> {
  const ipcIsDefined = Reflect.has(window, '__TAURI_IPC__')

  if (!ipcIsDefined) {
    if (noThrow) return undefined!
    else throw new NoIpcException()
  }

  return command()
}
