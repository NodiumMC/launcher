import { singleton } from 'tsyringe'
import { Storage } from '../filesystem/Storage.service'
import { Preloader } from './Preloader.service'
import { I18n } from '../i18n/i18n.service'
import { wait } from '../../utils/wait'
import { ThemeService } from '../theme/Theme.service'

@singleton()
export class StartupService {
  private once = false

  constructor(
    private readonly st: Storage,
    private readonly preloader: Preloader,
    private readonly i18n: I18n,
    private readonly theme: ThemeService,
  ) { }

  run() {
    if (this.once) return
    this.preloader.add(this.i18n.$('loading.loading_storage'), async () => {
      await this.st.load()
      this.theme.update()
    })
    this.preloader.add(this.i18n.$('loading.initialization'), () => wait(2000))
    this.preloader.add(this.i18n.$('loading.loading'), () => wait(2000))
    this.once = true
  }
}
