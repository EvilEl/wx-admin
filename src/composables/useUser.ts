import { authApi } from '@/api/auth'
import { createGlobalState, StorageSerializers, useStorage } from '@vueuse/core'
import { ref } from 'vue'
import type { User } from '@/api/auth'

export const useUser = createGlobalState(() => {
  const user = useStorage<User | null>('user', null, undefined, {
    serializer: StorageSerializers.object,
  })
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const login = async (credentials: { login: string, password: string }) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await authApi.login(credentials)
      user.value = response
    } catch (err) {
      error.value = err.response?.data?.message || 'An error occurred during login'
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
      error.value = err.response?.data?.message || 'An error occurred during login'
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
})
