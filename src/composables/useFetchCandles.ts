import axios from 'axios'
import { ref } from 'vue'
import type { IProductBase } from '@/interfaces/Product'
import { useApi } from './useApi'

export interface IOptions {
  immediate?: boolean
}

export function useFetchCandles(options: IOptions = {
  immediate: false,
}) {
  const api = useApi()
  const items = ref<IProductBase[]>([])
  const isLoading = ref(false)
  const errMessage = ref('')

  async function getCandles(): Promise<void> {
    try {
      isLoading.value = true
      if (!api.value) {
        return
      }
      items.value = (await api.value.get<IProductBase[]>('/candles')).data
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
    getCandles()
  }

  return {
    getCandles,
    items,
    isLoading,
    errMessage,
  }
}
