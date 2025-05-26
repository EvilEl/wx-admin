import axios from 'axios'
import { ref } from 'vue'
import { useApi } from './useApi'
import type { IProductBase } from '@/interfaces/Product'

export interface IOptions {
  immediate?: boolean
}

export function useFetchSachets(options: IOptions = {
  immediate: false,
}) {
  const api = useApi()
  const items = ref<IProductBase[]>([])
  const isLoading = ref(false)
  const errMessage = ref('')

  async function getSachets(): Promise<void> {
    try {
      isLoading.value = true
      if (!api.value) {
        return
      }
      items.value = (await api.value.get<IProductBase[]>('/sachets')).data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errMessage.value = error.response?.data
      }
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }
  if (options.immediate) {
    getSachets()
  }

  return {
    getSachets,
    items,
    isLoading,
    errMessage,
  }
}
