import { useAxios } from '@/composables/useAxios'
import { useUser } from './useUser'

export function useApi() {
  const { user, logout, refreshToken } = useUser()
  const { instance } = useAxios('api', {
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  }, (instance) => {
    instance.interceptors.request.use(
      (config) => {
        if (!user.value) {
          return config
        }
        const accessToken = user.value.accessToken
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          const originalRequest = error.config
          try {
            console.log('user.value', user.value)

            const res = await refreshToken({
              login: user.value!.login,
              refreshToken: user.value!.refreshToken,
            })

            if (user.value) {
              user.value.accessToken = res.accessToken
              user.value.refreshToken = res.refreshToken
            }

            originalRequest.headers.Authorization = `Bearer ${res.accessToken}`
            return instance(originalRequest)
          } catch (_) {
            logout()
          }
        }
        return Promise.reject(error)
      },
    )
  })

  return instance
}
