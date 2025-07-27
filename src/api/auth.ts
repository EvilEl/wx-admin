import { extend } from 'zod/v4-mini'
import { useAuthApi } from '@/composables/useAuthApi'

interface LoginCredentials {
  login: string
  password: string
}

export interface User {
  id: string
  login: string
  accessToken: string
  refreshToken: string
}

export interface RefreshData extends Pick<User, 'login' | 'refreshToken'> {}

export function authApi() {
  const api = useAuthApi()

  async function authenticate(credentials: LoginCredentials) {
    if (!api.value) {
      return
    }
    const response = await api.value.post('login', credentials)
    return response.data
  }

  async function refresh(data: RefreshData) {
    if (!api.value) {
      return
    }
    const response = await api.value.post('refresh', data)
    return response.data
  }

  return {
    authenticate,
    refresh,
  }
}
