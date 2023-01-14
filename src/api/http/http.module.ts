import { delay, inject } from '@nodium/tsyringe'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Module } from 'positron'
import { HttpAxios } from './http.axios'
import type { IHttpAxios, IHttpService } from './http.interfaces'
import { HttpService } from './http.service'
import { HttpStore } from './http.store'
import { PreloaderModule } from 'preload'
import { I18nModule } from 'i18n'

@Module
export class HttpModule {
  constructor(
    private readonly store: HttpStore,
    @inject(delay(() => HttpService)) private readonly service: IHttpService,
    @inject(delay(() => HttpAxios)) private readonly axios: IHttpAxios,
    private readonly prelaod: PreloaderModule,
    private readonly i18n: I18nModule,
  ) {
    this.prelaod.spawn(this.i18n.translate.preload.loggingin, () => this.service.tryRefresh())
  }

  get isAuth() {
    return this.service.isAuth
  }

  auth(access: string, refresh: string) {
    this.service.auth(access, refresh)
  }

  request = <T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R> =>
    this.axios.request(config)
  get = <T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> =>
    this.axios.get(url, config)
  delete = <T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> =>
    this.axios.delete(url, config)
  post = <T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> =>
    this.axios.post(url, data, config)
  put = <T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> =>
    this.axios.put(url, data, config)

  async logout() {
    return this.service.logout()
  }
}
