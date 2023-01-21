import { RawAxiosRequestConfig, AxiosResponse } from 'axios'

export interface IHttpAxios {
  request<T = any, R = AxiosResponse<T>, D = any>(config: RawAxiosRequestConfig<D>): Promise<R>
  get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: RawAxiosRequestConfig<D>): Promise<R>
  delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: RawAxiosRequestConfig<D>): Promise<R>
  post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: RawAxiosRequestConfig<D>): Promise<R>
  put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: RawAxiosRequestConfig<D>): Promise<R>
}

export interface IHttpService {
  get isAuth(): boolean
  logout(): Promise<void>
  auth(access: string, refresh: string): void
  refresh(): Promise<void>
  tryRefresh(): Promise<void>
}
