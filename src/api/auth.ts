import { useAuthApi } from '@/composables/useAuthApi'

interface LoginCredentials {
  login: string
  password: string
}

export interface User {
  id: string
  login: string
  token: string
}

export function authApi() {
  const api = useAuthApi()

  async function authenticate(credentials: LoginCredentials) {
    if (!api.value) {
      return
    }
    const response = await api.value.post('login', credentials)
    return response.data
  }

  return {
    authenticate,
  }
}
