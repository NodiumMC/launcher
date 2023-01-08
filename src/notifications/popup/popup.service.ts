import { FC } from 'react'
import { nanoid } from 'nanoid'
import { PopupStore } from './popup.store'
import { Service } from 'positron'

@Service
export class PopupService {
  constructor(private readonly store: PopupStore) {}

  private createId = () => nanoid()

  create<T extends object>(template: FC<T>, props: T): void {
    const idx = this.createId()
    this.store.add(idx, [template, { ...props, close: () => this.close(idx) }])
  }

  close(id: string) {
    this.store.remove(id)
  }
}
