import { makeAutoObservable } from 'mobx'
import { singleton } from 'tsyringe'

@singleton()
export class MinecraftJournal {
  readonly lines: string[] = []

  constructor() {
    makeAutoObservable(this)
  }

  write(line: string) {
    this.lines.push(line)
  }
}
