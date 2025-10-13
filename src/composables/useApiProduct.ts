import axios from 'axios'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { useProductFiles } from '@/composables/useProductFiles'
import type { ICreateProduct, IProduct } from '@/interfaces/Product'
import { useApi } from './useApi'

export function useApiProduct() {
  const api = useApi()
  const errMessage = ref('')
  const isLoading = ref(false)
  const { sendFile, onChangeFiles } = useProductFiles()

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
      if (res) {
        sendFile(res.data.id)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errMessage.value = error.response?.data ?? error.message
        console.log('Ошибка создания продукта', error)
        toast.error(errMessage.value)
      } else {
        console.log('Ошибка создания продукта', error)
        toast.error(error)
      }
    } finally {
      isLoading.value = false
    }
  }

  async function updateProduct(id: number, data: Partial<IProduct>) {
    try {
      clear()
      const formData = new FormData()
      if (data.count) {
        formData.append('count', String(data.count))
      }
      if (data.name) {
        formData.append('name', String(data.name))
      }
      if (data.price) {
        formData.append('price', String(data.price))
      }
      await api.value?.put<{ id: number }>(`/products/${id}`, data)
      isLoading.value = true
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
    updateProduct,
    errMessage,
  }
}
