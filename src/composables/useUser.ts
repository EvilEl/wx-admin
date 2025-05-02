import { authApi } from '@/api/auth'
import { ref } from 'vue'

interface User {
  id: string
  login: string
}

export function useUser() {
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const login = async (credentials: { login: string, password: string }) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await authApi.login(credentials)
      user.value = response.data
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred during login'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      isLoading.value = true
      error.value = null
      await authApi.logout()
      user.value = null
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred during logout'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    user,
    isLoading,
    error,
    login,
    logout,
  }
}
