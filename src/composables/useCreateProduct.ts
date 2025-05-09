import axios from 'axios'
import { ref } from 'vue'
import { useApi } from './useApi'

export function useCreateProduct() {
  const api = useApi()
  const errMessage = ref('')
  const isLoading = ref(false)

  async function createCandle(data) {
    try {
      clear()
      isLoading.value = true
      await api.value?.post('/candle', data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errMessage.value = error.response?.data
      }
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }

  function clear() {
    errMessage.value = ''
  }

  return {
    createCandle,
    errMessage,
  }
}
