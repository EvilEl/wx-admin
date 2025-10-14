import axios from 'axios'
import { ref, toValue } from 'vue'
import { toast } from 'vue-sonner'
import type { ICreateCategory } from '@/interfaces/Product'
import { useApi } from './useApi'
import type { MaybeRefOrGetter } from 'vue'

export function useApiCategories() {
  const api = useApi()
  const errMessage = ref('')
  const isLoading = ref(false)

  async function createCategory(value: MaybeRefOrGetter<ICreateCategory>) {
    try {
      clear()
      const categoryData = toValue(value)
      isLoading.value = true
      const data = {
        name: categoryData.name,
        description: categoryData.description,
      }
      await api.value?.post<{ id: number }>('/category', data)
      toast.success('Категория создана')
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

  async function updateCategory(id: number, data: any) {
    try {
      clear()
      const formData = new FormData()
      if (data.name) {
        formData.append('name', String(data.name))
      }
      if (data.description) {
        formData.append('description', String(data.description))
      }
      isLoading.value = true
      await api.value?.put<{ id: number }>(`/category/${id}`, data)
      toast.success('Категория успешно изменена')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errMessage.value = error.response?.data
      }
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }

  async function getAllCategories() {
    try {
      clear()
      isLoading.value = true
      return (await api.value?.get('/category')).data
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
    createCategory,
    updateCategory,
    getAllCategories,
    errMessage,
  }
}
