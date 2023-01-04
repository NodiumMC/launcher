import { Child } from 'native/shell'
import type { SupportedProviders } from 'core/providers'
import { makeAutoObservable } from 'mobx'
import { compileLocal, launch, populate, unzipNatives, VersionFile } from 'core'
import { exists, prepare, readJsonFile, writeJsonFile } from 'native/filesystem'
import { join } from 'native/path'
import { w } from 'debug'
import { catchError, lastValueFrom } from 'rxjs'
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
import { Progress } from 'utils'

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
  private _lacc = ''
  readonly progress = new Progress(100, 0, 0)

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

  private checkPrelaunch() {
    if (!this.installed) w(t => t.launch_requires_installation, 'Launch requires actual installation')
    if (this._child) w(t => t.unable_to_launch_more_once, 'Cannot run the same instance more than once')
  }

  private async createChild() {
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
  }

  private logsCollector(data: string) {
    if (!data.includes('</log4j:Event>')) this._lacc += data
    else {
      const parsed = parse(this._lacc)
      this.logs.push(parsed)
      if (this.logs.length > 1000) this.logs.shift()
      this._lacc = ''
    }
  }

  private launchChildSubscribes() {
    return new Promise((_, reject) => {
      this.child?.on('std', this.logsCollector.bind(this))
      this.child?.on('error', () => ((this.prelaunched = false), (this._child = null)))
      this.child?.on('error', reject)
      this.child?.on('close', () => ((this.prelaunched = false), (this._child = null)))
      this.child?.on('close', reject)
    })
  }

  async launch() {
    this._busy = true
    try {
      this.checkPrelaunch()
      this.prelaunched = true
      await this.createChild()
      await this.launchChildSubscribes()
      this.lastUsed = Date.now()
      this._busy = false
    } catch (e) {
      this._busy = false
      throw e
    }
  }

  private async compile() {
    return compileLocal(this.versionId, this.clientDir, this.gs!.gameDir)
  }

  async totalSize() {
    return this.compile().then(v => v.reduce((a, c) => a + (c.size ?? 0), 0))
  }

  private get profileExists() {
    return this.gp?.has(this.versionId)
  }

  private async createProfile() {
    const providerFn = providers[this.provider as keyof typeof providers]
    if (!providerFn) w(t => t.unknown_provider, `Unknown provider: ${this.provider}`)
    if (!this.vid) w(t => t.no_version_selected, 'Missing version data')
    await this.gp?.create(providerFn, this.vid, this.versionId, this.versionId)
  }

  private async createProfileIfNotExists() {
    if (!this.profileExists) {
      await this.createProfile()
    }
  }

  private get manifestPath() {
    return join(this.clientDir, `${this.versionId}.json`)
  }

  private async manifestExists() {
    return await exists(this.manifestPath)
  }

  private async updateManifest() {
    const manifestPath = this.manifestPath
    if (!(await this.manifestExists()))
      w(t => t.missing_version_manifest, `Missing version manifest json file at path ${manifestPath}`)
    await writeJsonFile(manifestPath, await populate(await readJsonFile<VersionFile>(manifestPath)))
    return readJsonFile<VersionFile>(manifestPath)
  }

  private async downloadJdk(major: number) {
    const jdkInstaller = await this.jrs!.installIfNot(major)
    if (jdkInstaller) {
      jdkInstaller.subscribe({
        next: ({ total, progress, stage }) => {
          this.progress.update(progress.map(0, total, 0, 100), 100, stage)
        },
        error(err) {
          w(t => t.jvm_install_failed, `Java Runtime install failed: ${err}`)
        },
      })
      await lastValueFrom(jdkInstaller)
    }
  }

  private unzipNatives() {
    const o = unzipNatives(join(this.clientDir, 'natives')).pipe(
      catchError(err => w(t => t.unpack_natives_failed, `Failed to unpack natives: ${err}`)),
    )
    return lastValueFrom(o)
  }

  private async installClient() {
    const clientDir = this.clientDir
    const installer = batchDownload(await compileLocal(this.versionId, clientDir, this.gs!.gameDir)).pipe(
      catchError(err => w(t => t.minecraft_assets_download_failed, `Minecraft assets download failed: ${err}`)),
    )
    installer.subscribe({
      next: ({ total, progress }) => {
        this.progress.update(progress.map(0, total, 0, 100), 100, 2)
      },
    })
    return lastValueFrom(installer)
  }

  async install() {
    this._busy = true
    try {
      await this.createProfileIfNotExists()
      const file = await this.updateManifest()
      await this.downloadJdk(file.javaVersion.majorVersion)
      await this.installClient()
      await this.unzipNatives()
      this._busy = false
      this.progress.reset()
      this.installed = true
    } catch (e) {
      this._busy = false
      this.progress.reset()
      throw e
    }
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
