import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface IHttpAxios {
  request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>
  get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>
  delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>
  post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>
  put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>
}

export interface IHttpService {
  get isAuth(): boolean
  logout(): Promise<void>
  auth(access: string, refresh: string): void
  refresh(): Promise<void>
  tryRefresh(): Promise<void>
}
