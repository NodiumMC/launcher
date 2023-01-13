import { Service } from 'positron'
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import axiosTauriApiAdapter from 'axios-tauri-api-adapter'
import { HttpStore } from './http.store'
import { HttpService } from './http.service'
import { delay, inject } from '@nodium/tsyringe'
import type { IHttpAxios, IHttpService } from './http.interfaces'

@Service
export class HttpAxios implements IHttpAxios {
  instance = axios.create({ adapter: axiosTauriApiAdapter as any, baseURL: 'https://api.nodium.ru/' })

  constructor(
    private readonly store: HttpStore,
    @inject(delay(() => HttpService)) private readonly service: IHttpService,
  ) {
    this.instance.interceptors.request.use((config: any) => {
      config.headers = {
        ...(config.headers ?? {}),
        Authorization: config.headers?.Authorization ?? `Bearer ${this.store.access}`,
      }

      return config
    })

    this.instance.interceptors.response.use(
      value => value,
      async error => {
        const request = error.config
        if ((error.response.status = 401 && !request._retry && !request.refresh)) {
          request._retry = true
          await this.service.refresh()
          return this.request(request)
        }
        return Promise.reject(error)
      },
    )
  }

  request = <T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R> =>
    this.instance.request(config)
  get = <T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> =>
    this.instance.get(url, config)
  delete = <T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> =>
    this.instance.delete(url, config)
  post = <T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> =>
    this.instance.post(url, data, config)
  put = <T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> =>
    this.instance.put(url, data, config)
}
