import { Child } from 'native/shell'
import type { SupportedProviders } from 'core/providers'
import { makeAutoObservable } from 'mobx'
import { compileLocal, launch, populate, unzipNatives, VersionFile } from 'core'
import { exists, prepare, readJsonFile, writeJsonFile } from 'native/filesystem'
import { join } from 'native/path'
import { w } from 'debug'
import { lastValueFrom, Observable } from 'rxjs'
import { batchDownload } from 'network'
import { autoInjectable, container } from 'tsyringe'
import { GeneralSettings } from 'settings/GeneralSettings.service'
import { GameProfileService } from 'minecraft/GameProfile.service'
import * as providers from 'core/providers/implemented'
import { PublicVersion } from 'core/providers/types'
import { nanoid } from 'nanoid'
import { LogEvent, parse } from 'core/logging'
import { JavaRuntimeService } from 'java'
import { PlayerLiteService } from 'user/PlayerLite.service'

export interface InstanceSettings {
  javaArgs?: string[]
  minecraftArgs?: string[]
  alloc?: number
  windowHeight?: number
  windowWidth?: number
}

export interface InstanceLocal {
  name: string
  dirname?: string
  vid: PublicVersion | null
  provider?: SupportedProviders
  installed?: boolean
  settings?: InstanceSettings
  logs?: LogEvent[]
  lastUsed?: number
}

@autoInjectable()
export class Instance {
  name: string
  vid: PublicVersion | null = null
  provider: SupportedProviders
  private installed = false
  settings: InstanceSettings
  private _busy = false
  private _child: Child | null = null
  private prelaunched = false
  readonly dirname: string
  readonly logs: LogEvent[] = []
  lastUsed: number = Date.now()

  constructor(
    private readonly gs: GeneralSettings | undefined,
    private readonly gp: GameProfileService | undefined,
    private readonly jrs: JavaRuntimeService | undefined,
    private readonly user: PlayerLiteService | undefined,
    name: string,
    dirname?: string,
    vid?: PublicVersion | null,
    provider: SupportedProviders = 'vanilla',
    installed = false,
    settings?: InstanceSettings,
    logs: LogEvent[] = [],
    lastUsed: number = Date.now(),
  ) {
    this.name = name
    this.dirname = dirname ?? nanoid(10)
    this.vid = vid ?? null
    this.provider = provider
    this.installed = installed
    this.settings = settings ?? {}
    this.logs = logs
    this.lastUsed = lastUsed
    makeAutoObservable(this)
  }

  static fromLocal(local: InstanceLocal) {
    return new Instance(
      container.resolve(GeneralSettings),
      container.resolve(GameProfileService),
      container.resolve(JavaRuntimeService),
      container.resolve(PlayerLiteService),
      local.name,
      local.dirname,
      local.vid,
      local.provider,
      local.installed,
      local.settings,
      local.logs,
      local.lastUsed,
    )
  }

  toLocal() {
    return {
      vid: this.vid,
      dirname: this.dirname,
      provider: this.provider,
      name: this.name,
      settings: this.settings,
      installed: this.installed,
      logs: this.logs,
      lastUsed: this.lastUsed,
    }
  }

  get isInstalled() {
    return this.installed
  }

  set isInstalled(value: boolean) {
    this.installed = value
  }

  get busy() {
    return this._busy
  }

  get displayName() {
    return this.name.explain({ provider: this.provider, version: this.vid?.id ?? 'unknown' })
  }

  get isValid() {
    return !!(this.jrs && this.gp && this.gs && this.user && this.dirname && this.user.isValid)
  }

  private get versionId() {
    if (this.vid === null) w('No game profile selected')
    return this.provider === 'custom' ? this.vid.id : `${this.provider}-${this.vid.id}`
  }

  private async clientDir() {
    return join(await this.gs!.getGameDir(), 'versions', this.versionId)
  }

  async getInstanceDir() {
    return prepare(join(await this.gs!.getGameDir(), 'instances', this.dirname))
  }

  launch() {
    this._busy = true
    if (!this.installed) w('Launch requires actual installation')
    return new Observable<LogEvent>(subscriber => {
      void (async () => {
        if (this._child) w('Cannot run the same instance more than once')
        this.prelaunched = true
        const gameDir = await this.gs!.getGameDir()
        const versionId = this.versionId
        const clientDir = await prepare(await this.clientDir())
        this._child = await launch({
          javaExecutable: major => this.jrs!.for(major),
          vid: versionId,
          gameDataDir: gameDir,
          gameDir: await this.getInstanceDir(),
          clientDir,
          ...this.settings,
          username: this.user!.nickname,
        })
        let event = ''
        const collect = (data: string) => {
          if (!data.includes('</log4j:Event>')) event += data
          else {
            const parsed = parse(event)
            subscriber.next(parsed)
            this.logs.push(parsed)
            if (this.logs.length > 1000) this.logs.shift()
            event = ''
          }
        }
        this.child?.on('std', collect)
        this.child?.on('error', subscriber.error.bind(subscriber))
        this.child?.on('error', () => ((this.prelaunched = false), (this._child = null)))
        this.child?.on('close', subscriber.complete.bind(subscriber))
        this.child?.on('close', () => ((this.prelaunched = false), (this._child = null)))
        this.lastUsed = Date.now()
        this._busy = false
      })().catch(e => {
        this._busy = false
        subscriber.error(e)
      })
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
    return new Observable<{ progress: number; stage: number }>(subscriber => {
      void (async () => {
        const clientDir = await this.clientDir()
        if (!this.gp?.has(this.versionId)) {
          const providerFn = providers[this.provider as keyof typeof providers]
          if (!providerFn) w('Unknown provider')
          if (!this.vid) w('Missing version data')
          await this.gp?.create(providerFn, this.vid, this.versionId, this.versionId)
        }
        const manifestPath = join(clientDir, `${this.versionId}.json`)
        if (!(await exists(manifestPath))) w(`Missing version manifest json file at path ${manifestPath}`)
        const file = await readJsonFile<VersionFile>(manifestPath)
        const jdkInstaller = await this.jrs!.installIfNot(file.javaVersion.majorVersion)
        if (jdkInstaller) {
          jdkInstaller.subscribe({
            next({ total, progress, stage }) {
              subscriber.next({ progress: progress.map(0, total, 0, 100), stage })
            },
            error(err) {
              subscriber.error(`Java Runtime install failed: ${err}`)
            },
          })
          await lastValueFrom(jdkInstaller)
        }
        await writeJsonFile(manifestPath, await populate(file))
        const installer = batchDownload(await compileLocal(this.versionId, clientDir, await this.gs!.getGameDir()))
        installer.subscribe({
          next({ total, progress }) {
            subscriber.next({ progress: progress.map(0, total, 0, 100), stage: 2 })
          },
          error: err => {
            this._busy = false
            subscriber.error(`Minecraft assets download failed: ${err}`)
          },
          complete: () => {
            this.installed = true
            this._busy = false
            unzipNatives(join(clientDir, 'natives')).subscribe({
              complete() {
                subscriber.complete()
              },
              error: err => {
                subscriber.error(`Failed to unpack natives: ${err}`)
              },
            })
          },
        })
      })().catch(e => {
        this._busy = false
        subscriber.error(e)
      })
    })
  }

  get child() {
    return this._child
  }

  async stop() {
    if (!this.child) w('Nothing to stop')
    // await this.child.kill().then(() => {
    //   this._child = null
    //   this._busy = false
    // })
  }
}
