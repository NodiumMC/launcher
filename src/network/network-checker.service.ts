import { fetch } from '@tauri-apps/api/http'
import { Service } from 'positron'
import { NetworkCheckerStore } from 'network/network-checker.store'

@Service
export class NetworkCheckerService {
  update(value = true) {
    this.store.available = value
    if (value) this.store.events.emit('available')
  }

  constructor(private readonly store: NetworkCheckerStore) {
    setInterval(() => {
      const start = performance.now()
      fetch('https://resources.download.minecraft.net/00/', { method: 'GET', timeout: 5000 }).then(
        response => {
          if (response.status === 200 || response.status === 404) {
            this.update(true)
            this.store.add(performance.now() - start)
          } else this.update(false)
        },
        () => this.update(false),
      )
    }, 5000)
  }
}
