import { createGlobalState, StorageSerializers, useStorage } from '@vueuse/core'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authApi } from '@/api/auth'
import type { RefreshData, User } from '@/api/auth'

export const useUser = createGlobalState(() => {
  const user = useStorage<User | null>('user', null, localStorage, {
    mergeDefaults: true,
    serializer: StorageSerializers.object,
  })
  const router = useRouter()
  const { authenticate, refresh } = authApi()
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const login = async (credentials: { login: string, password: string }) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await authenticate(credentials)
      user.value = response
      router.push({ name: 'root' })
    } catch (err) {
      error.value = err.response?.data?.message || 'An error occurred during login'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const refreshToken = async (data: RefreshData) => {
    return await refresh(data)
  }

  const logout = () => {
    user.value = null
    router.push({ name: 'login' })
  }

  return {
    user,
    isLoading,
    error,
    login,
    logout,
    refreshToken,
  }
})
