import { delay, inject } from '@nodium/tsyringe'
import { mapErr } from 'error'
import { Service } from 'positron'
import { HttpAxios } from './http.axios'
import { LogoutException } from './http.exceptions'
import type { IHttpAxios, IHttpService } from './http.interfaces'
import { HttpStore } from './http.store'
import { TokenPair } from './http.types'

@Service
export class HttpService implements IHttpService {
  constructor(private readonly store: HttpStore, @inject(delay(() => HttpAxios)) private readonly axios: IHttpAxios) {}

  get isAuth(): boolean {
    return !this.store.access
  }

  async logout(): Promise<void> {
    await this.axios
      .delete('auth/logout', {
        headers: {
          Authorization: `Bearer ${this.store.refresh}`,
        },
      })
      .catch(mapErr(LogoutException))
    this.store.access = null
    this.store.refresh = null
  }

  auth(access: string, refresh: string) {
    this.store.access = access
    this.store.refresh = refresh
  }

  async refresh() {
    const { accessToken, refreshToken } = await this.axios
      .put<TokenPair>('auth/refresh', {
        headers: {
          Authorization: `Bearer ${this.store.refresh}`,
        },
        refresh: true,
      })
      .then(res => res.data)
    this.store.access = accessToken
    this.store.refresh = refreshToken
  }
}
