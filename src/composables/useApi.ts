import { useAxios } from '@/composables/useAxios'
import { useUser } from './useUser'

export function useApi() {
  const { user, logout } = useUser()
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
        const token = user.value.token
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout()
        }
        return Promise.reject(error)
      },
    )
  })

  return instance
}
