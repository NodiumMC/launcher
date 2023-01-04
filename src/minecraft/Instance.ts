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
  logs: LogEvent[] = []
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
    if (this.vid === null) w(t => t.no_game_profiles_selected, 'No game profile selected')
    return this.provider === 'custom' ? this.vid.id : `${this.provider}-${this.vid.id}`
  }

  private get clientDir() {
    return join(this.gs!.gameDir, 'versions', this.versionId)
  }

  async getInstanceDir() {
    return prepare(join(this.gs!.gameDir, 'instances', this.dirname))
  }

  get instanceDir() {
    return join(this.gs!.gameDir, 'instances', this.dirname)
  }

  get profile() {
    return this.gp!.list.find(v => v.lastVersionId === this.versionId)!
  }

  launch() {
    this._busy = true
    if (!this.installed) w(t => t.launch_requires_installation, 'Launch requires actual installation')
    return new Observable<LogEvent>(subscriber => {
      void (async () => {
        if (this._child) w(t => t.unable_to_launch_more_once, 'Cannot run the same instance more than once')
        this.prelaunched = true
        const gameDir = this.gs!.gameDir
        const versionId = this.versionId
        const clientDir = await prepare(this.clientDir)
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
        this.child?.on('close', code => (subscriber.error(code), subscriber.complete()))
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
    return compileLocal(this.versionId, this.clientDir, this.gs!.gameDir)
  }

  async totalSize() {
    return this.compile().then(v => v.reduce((a, c) => a + (c.size ?? 0), 0))
  }

  install() {
    this._busy = true
    return new Observable<{ progress: number; stage: number }>(subscriber => {
      void (async () => {
        const clientDir = this.clientDir
        if (!this.gp?.has(this.versionId)) {
          const providerFn = providers[this.provider as keyof typeof providers]
          if (!providerFn) w(t => t.unknown_provider, `Unknown provider: ${this.provider}`)
          if (!this.vid) w(t => t.no_version_selected, 'Missing version data')
          await this.gp?.create(providerFn, this.vid, this.versionId, this.versionId)
        }
        const manifestPath = join(clientDir, `${this.versionId}.json`)
        if (!(await exists(manifestPath)))
          w(t => t.missing_version_manifest, `Missing version manifest json file at path ${manifestPath}`)
        let file = await readJsonFile<VersionFile>(manifestPath)
        await writeJsonFile(manifestPath, await populate(file))
        file = await readJsonFile<VersionFile>(manifestPath)
        const jdkInstaller = await this.jrs!.installIfNot(file.javaVersion.majorVersion)
        if (jdkInstaller) {
          jdkInstaller.subscribe({
            next({ total, progress, stage }) {
              subscriber.next({ progress: progress.map(0, total, 0, 100), stage })
            },
            error(err) {
              w(t => t.jvm_install_failed, `Java Runtime install failed: ${err}`)
            },
          })
          await lastValueFrom(jdkInstaller)
        }
        const installer = batchDownload(await compileLocal(this.versionId, clientDir, this.gs!.gameDir))
        installer.subscribe({
          next({ total, progress }) {
            subscriber.next({ progress: progress.map(0, total, 0, 100), stage: 2 })
          },
          error: err => {
            this._busy = false
            w(t => t.minecraft_assets_download_failed, `Minecraft assets download failed: ${err}`)
          },
          complete: () => {
            this._busy = false
            unzipNatives(join(clientDir, 'natives')).subscribe({
              complete: () => {
                this.installed = true
                subscriber.complete()
              },
              error: err => {
                w(t => t.unpack_natives_failed, `Failed to unpack natives: ${err}`)
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
    if (!this.child) w(t => t.nothing_to_stop, 'Nothing to stop')
    // await this.child.kill().then(() => {
    //   this._child = null
    //   this._busy = false
    // })
  }

  clearLogs() {
    this.logs = []
  }
}
