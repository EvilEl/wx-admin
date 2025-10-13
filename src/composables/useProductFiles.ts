import { createGlobalState } from '@vueuse/core'
import { computed, ref } from 'vue'
import { toast } from 'vue-sonner'
import { filesApi } from '@/api/files'
import type { ProductFile, RemoveFileFromProduct } from '@/api/files'
import { toBase64 } from '@/lib/utils'

export const useProductFiles = createGlobalState(() => {
  const api = filesApi()

  const files = ref<ProductFile[]>([])
  const selectedFiles = ref<File[]>([])

  const images = computed(() => files.value.map(item => item.base64))

  async function getFilesProduct(id: number = 1) {
    files.value = await api.getFilesProduct(id)
  }

  async function sendFile(id: number) {
    if (!selectedFiles.value.length) {
      return
    }
    const tasks = selectedFiles.value.map(async (file) => {
      try {
        const base64 = await toBase64(file)
        const data = {
          filename: file.name,
          idProduct: id,
          originalname: file.name,
          mimeType: file.type,
          size: file.size,
          link: '',
          base64,
        } as ProductFile
        await api.createFile(data)
        files.value.push(data)
      } catch (error) {
        console.error('Ошибка обработки файла:', file.name, error)
        toast.error(error)
      }
    })
    await Promise.all(tasks)

    selectedFiles.value = []
  }

  function onChangeFiles(e: Event) {
    const files = (e.target as HTMLInputElement).files
    if (!files) {
      return
    }
    console.log('files', files)
    selectedFiles.value = [...files]
  }

  async function onRemoveFileFromProduct(data: RemoveFileFromProduct) {
    try {
      await api.removeFileFromProduct(data)
      toast.success('Файл удален успешно')
    } catch (error) {
      console.error('Ошибка удаления файла:', error)
      toast.error(error)
    }
  }

  return {
    files,
    images,
    selectedFiles,
    sendFile,
    getFilesProduct,
    onChangeFiles,
    onRemoveFileFromProduct,
  }
})
