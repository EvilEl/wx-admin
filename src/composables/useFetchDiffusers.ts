import axios from 'axios'
import { computed, ref } from 'vue'
import { useApi } from './useApi'

export interface IOptions {
  immediate?: boolean
}

export interface IDiffusers {
  id: number
  name: string
  count: number
  price: number
}

export function useFetchDiffusers(options: IOptions = {
  immediate: false,
}) {
  const api = useApi()
  const items = ref<IDiffusers[]>([])
  const isLoading = ref(false)
  const errMessage = ref('')

  async function getSachets(): Promise<void> {
    try {
      isLoading.value = true
      if (!api.value) {
        return
      }
      items.value = (await api.value.get<IDiffusers[]>('/diffusers')).data
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
