import axios from 'axios'
import { ref } from 'vue'
import { useApi } from './useApi'

const groupProduct = Object.freeze({
  candles: 'candles',
  diffusers: 'diffusers',
  sachets: 'sachets',
})

export interface IProduct {
  name: string
  count: number
  price: number
}
export type keyGroupProduct = keyof typeof groupProduct

export interface ICreateProduct extends IProduct {
  group: keyGroupProduct
}

export function useCreateProduct() {
  const api = useApi()
  const errMessage = ref('')
  const isLoading = ref(false)

  async function createCandle(data: IProduct) {
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
  async function createDiffuser(data: IProduct) {
    try {
      clear()
      isLoading.value = true
      await api.value?.post('/diffuser', data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errMessage.value = error.response?.data
      }
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }
  async function createSachet(data: IProduct) {
    try {
      clear()
      isLoading.value = true
      await api.value?.post('/sachet', data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errMessage.value = error.response?.data
      }
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }

  async function createProduct(product: ICreateProduct) {
    const data = {
      name: product.name,
      count: product.count,
      price: product.price,
    }

    if (product.group === groupProduct.candles) {
      createCandle(data)
    } else if (product.group === groupProduct.diffusers) {
      createDiffuser(data)
    } else {
      createSachet(data)
    }
  }

  function clear() {
    errMessage.value = ''
  }

  return {
    createCandle,
    createDiffuser,
    createSachet,
    createProduct,
    errMessage,
  }
}
