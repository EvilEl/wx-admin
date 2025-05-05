import { useAxios } from '@/composables/useAxios'

export function useAuthApi() {
  const { instance } = useAxios('user', {
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return instance
}
