import { Child } from '@tauri-apps/api/shell'
import type { SupportedProviders } from 'core/providers'
import { makeAutoObservable } from 'mobx'
import { compileLocal, launch } from 'core'
import { exists, prepare } from 'native/filesystem'
import { join } from 'native/path'
import { w } from 'debug'
import { Observable } from 'rxjs'
import { batchDownload } from 'network'
import { autoInjectable, container } from 'tsyringe'
import { GeneralSettings } from 'settings/GeneralSettings.service'

export interface InstanceSettings {
  javaArgs?: string[]
  minecraftArgs?: string[]
  alloc?: number
  windowHeight?: number
  windowWidth?: number
}

export interface InstanceLocal {
  name: string
  vid: string | null
  provider?: SupportedProviders
  installed?: boolean
  settings?: InstanceSettings
}

@autoInjectable()
export class Instance {
  name: string
  vid: string | null = null
  provider: SupportedProviders
  private installed = false
  settings: InstanceSettings
  private _busy = false
  private _child: Child | null = null
  private prelaunched = false

  constructor(
    private readonly gs: GeneralSettings | undefined,
    name: string,
    vid?: string | null,
    provider: SupportedProviders = 'vanilla',
    installed = false,
    settings?: InstanceSettings,
  ) {
    this.name = name
    this.vid = vid ?? null
    this.provider = provider
    this.installed = installed
    this.settings = settings ?? {}
    makeAutoObservable(this)
  }

  static fromLocal(local: InstanceLocal) {
    return new Instance(
      container.resolve(GeneralSettings),
      local.name,
      local.vid,
      local.provider,
      local.installed,
      local.settings,
    )
  }

  toLocal() {
    return {
      vid: this.vid,
      provider: this.provider,
      name: this.name,
      settings: this.settings,
      installed: this.installed,
    }
  }

  get isInstalled() {
    return this.installed
  }

  get busy() {
    return this._busy
  }

  private get versionId() {
    if (this.vid === null) w('No game profile selected')
    return this.provider === 'custom' ? this.vid : `${this.provider}-${this.vid}`
  }

  private async clientDir() {
    return join(await this.gs!.getGameDir(), 'versions', this.versionId)
  }

  launch() {
    this._busy = true
    if (!this.installed) w('Launch requires actual installation')
    return new Observable<string>(subscriber => {
      void (async () => {
        if (this._child || this.prelaunched) w('Cannot run the same instance more than once')
        this.prelaunched = true
        const gameDir = await this.gs!.getGameDir()
        const versionId = this.versionId
        const clientDir = await prepare(await this.clientDir())
        const l = await launch({
          vid: versionId,
          gameDataDir: gameDir,
          gameDir: await prepare(join(gameDir, 'main')),
          clientDir,
          ...this.settings,
          username: 'Player',
        })
        l.stdout.on('data', subscriber.next.bind(subscriber))
        l.stderr.on('data', subscriber.next.bind(subscriber))
        l.on('error', subscriber.error.bind(subscriber))
        l.on('error', () => ((this.prelaunched = false), (this._child = null)))
        l.on('close', subscriber.complete.bind(subscriber))
        l.on('close', () => ((this.prelaunched = false), (this._child = null)))
        this._child = await l.spawn()
        this._busy = false
      })()
    })
  }

  private async compile() {
    return compileLocal(this.versionId, await this.clientDir(), await this.gs!.getGameDir())
  }

  async totalSize() {
    return this.compile().then(v => v.reduce((a, c) => a + (c.size ?? 0), 0))
  }

  install() {
    this._busy = true
    return new Observable<number>(subscriber => {
      void (async () => {
        const clientDir = await this.clientDir()
        const manifestPath = join(clientDir, `${this.versionId}.json`)
        if (!(await exists(manifestPath))) w(`Missing version manifest json file at path ${manifestPath}`)
        const installer = batchDownload(await compileLocal(this.versionId, clientDir, await this.gs!.getGameDir()))
        installer.subscribe({
          next({ total, progress }) {
            subscriber.next(progress.map(0, total, 0, 100))
          },
          error: err => {
            this._busy = false
            subscriber.error(err)
          },
          complete: () => {
            this.installed = true
            this._busy = false
            subscriber.complete()
          },
        })
      })()
    })
  }

  get child() {
    return this._child
  }

  async stop() {
    if (!this.child) w('Nothing to stop')
    await this.child.kill().then(() => {
      this._child = null
      this._busy = false
    })
  }
}
