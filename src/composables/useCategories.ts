import { onMounted, ref } from 'vue'
import { toast } from 'vue-sonner'
import type { ICategory } from '@/interfaces/Product'
import { useApiCategories } from './useApiCategories'

export function useCategories() {
  const { createCategory, updateCategory, getAllCategories, errMessage } = useApiCategories()

  const categories = ref<ICategory[]>([])
  const selectedCategory = ref('')
  const isLoading = ref(false)

  onMounted(() => {
    initCategories()
  })

  async function initCategories() {
    try {
      isLoading.value = true
      categories.value = await getAllCategories()
    } catch (error) {
      toast.error(error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    categories,
    isLoading,
    errMessage,
    selectedCategory,
    createCategory,
    updateCategory,
    initCategories,
  }
}
