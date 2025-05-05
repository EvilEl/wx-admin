import axios from 'axios'
import { ref } from 'vue'
import type { AxiosInstance, CreateAxiosDefaults } from 'axios'

export type KeyApi = 'api' | 'user'

const axiosInstances: Partial<Record<KeyApi, AxiosInstance>> = {}

export function useAxios(key: KeyApi, options: CreateAxiosDefaults, fn?: (instance: AxiosInstance) => void) {
  const instance = ref(axiosInstances[key])
  if (!axiosInstances[key]) {
    const axiosInstance = axios.create(options)
    axiosInstances[key] = axiosInstance
    if (fn) {
      fn(axiosInstance)
    }
  }
  instance.value = axiosInstances[key]

  return {
    instance,
  }
}
