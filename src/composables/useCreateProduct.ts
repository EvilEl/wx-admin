import axios from 'axios'
import { ref } from 'vue'
import { useProductFiles } from '@/composables/useProductFiles'
import { groupProduct } from '@/interfaces/Product'
import type { ICreateProduct, IProduct } from '@/interfaces/Product'
import { useApi } from './useApi'

export function useCreateProduct() {
  const api = useApi()
  const errMessage = ref('')
  const isLoading = ref(false)
  const { images, sendFile, getFilesProduct, onChangeFiles, selectedFiles } = useProductFiles()

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
    console.log('selectedFiles', selectedFiles)
    sendFile()
    return
    const data = {
      name: product.name,
      count: product.count,
      price: product.price,
    }
    // if (product.group === groupProduct.candles) {
    //   createCandle(data)
    // } else if (product.group === groupProduct.diffusers) {
    //   createDiffuser(data)
    // } else {
    //   createSachet(data)
    // }
  }

  function clear() {
    errMessage.value = ''
  }

  return {
    onChangeFiles,
    createCandle,
    createDiffuser,
    createSachet,
    createProduct,
    errMessage,
  }
}
