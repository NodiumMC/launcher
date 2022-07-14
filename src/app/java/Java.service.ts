import { singleton } from 'tsyringe'
import { Storage } from '../filesystem/Storage.service'
import { makeObservable, observable } from 'mobx'
import { command } from '../shell/command'
import { Child, Command } from '@tauri-apps/api/shell'

@singleton()
export class JavaService {
  @observable private _javaPath: string = ''

  constructor(private readonly st: Storage) {
    makeObservable(this)
    st.onLoad(() => this._javaPath = st._.java.path)
  }

  set javaPath(path: string) {
    this.st._.java.path = path
    this._javaPath = path
  }

  get javaPath() {
    return this._javaPath
  }

  async run(args: string[], cwd?: string): Promise<Child & Omit<Command, 'execute' | 'spawn' | '_emit'>> {
    const cmd = await command(this.javaPath, args, cwd)
    const handle = await cmd.spawn()
    return Object.assign({}, cmd, handle)
  }
}
