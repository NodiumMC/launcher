import { Module } from 'mobmarch'
import { makeAutoObservable } from 'mobx'

@Module
export class MinecraftJournal {
  readonly lines: string[] = []

  constructor() {
    makeAutoObservable(this)
  }

  write(line: string) {
    this.lines.push(line)
  }
}
