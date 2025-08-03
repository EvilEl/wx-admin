import axios from 'axios'
import { ref } from 'vue'
import { useProductFiles } from '@/composables/useProductFiles'
import type { ICreateProduct } from '@/interfaces/Product'
import { useApi } from './useApi'

export function useCreateProduct() {
  const api = useApi()
  const errMessage = ref('')
  const isLoading = ref(false)
  const { sendFile, selectedFiles, onChangeFiles } = useProductFiles()

  async function createProduct(product: ICreateProduct) {
    try {
      clear()
      isLoading.value = true
      const data = {
        name: product.name,
        count: product.count,
        price: product.price,
        type: product.type,
      }
      const res = await api.value?.post<{ id: number }>('/products', data)
      if (res && selectedFiles.value.length) {
        sendFile(res.data.id)
      }
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
    onChangeFiles,
    createProduct,
    errMessage,
  }
}
