import { StorageSerializers, useStorage } from '@vueuse/core'
import axios from 'axios'
import type { User } from './auth'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  (config) => {
    const user = useStorage<User | null>('user', null, undefined, {
      serializer: StorageSerializers.object,
    })

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
      localStorage.removeItem('token')
      // window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default instance
