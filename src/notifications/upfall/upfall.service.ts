import { Upfall } from '.'
import { nanoid } from 'nanoid/non-secure'
import { I18nModule, R18T } from 'i18n'
import { singleton } from '@nodium/tsyringe'
import { UpfallStore } from 'notifications/upfall/upfall.store'

@singleton()
export class UpfallService {
  constructor(private readonly store: UpfallStore, private readonly i18n: I18nModule) {}

  createId() {
    return nanoid(8)
  }

  drop(type: Upfall['type'], content: string | R18T, icon?: Upfall['icon']) {
    const id = this.createId()
    this.store.add(id, type, this.i18n.resolve(content), icon)
  }
}
