import axios from 'axios'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import type { IProductBase, ProductType } from '@/interfaces/Product'
import { useApi } from './useApi'

export interface IOptions {
  immediate?: boolean
}

export function useFetchProduct() {
  const api = useApi()
  const items = ref<IProductBase[]>([])
  const isLoading = ref(false)
  const errMessage = ref('')

  async function getProducts(productType: ProductType): Promise<void> {
    try {
      isLoading.value = true
      if (!api.value) {
        return
      }
      items.value = (await api.value.get<IProductBase[]>(`/products/type/${productType}`)).data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errMessage.value = error.response?.data ?? error.message
        console.log(errMessage.value)
        toast.error(errMessage.value)
      } else {
        console.log(error)
        toast.error(error)
      }
    } finally {
      isLoading.value = false
    }
  }

  return {
    getProducts,
    items,
    isLoading,
    errMessage,
  }
}
