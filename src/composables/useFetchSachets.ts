import axios from 'axios'
import { computed, ref } from 'vue'
import { useApi } from './useApi'

export interface IOptions {
  immediate?: boolean
}

export interface ISachet {
  id: number
  name: string
  count: number
  price: number
}

export function useFetchSachets(options: IOptions = {
  immediate: false,
}) {
  const api = useApi()
  const items = ref<ISachet[]>([])
  const isLoading = ref(false)
  const errMessage = ref('')

  async function getSachets(): Promise<void> {
    try {
      isLoading.value = true
      if (!api.value) {
        return
      }
      items.value = (await api.value.get<ISachet[]>('/sachets')).data
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
