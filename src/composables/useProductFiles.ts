import { filesApi } from '@/api/files'
import { toBase64 } from '@/lib/utils'
import { computed, ref } from 'vue'
import type { ProductFile } from '@/api/files'

export function useProductFiles() {
  const api = filesApi()

  const files = ref<ProductFile[]>([])
  const selectedFiles = ref<File[]>([])

  const images = computed(() => files.value.map(item => item.base64))

  async function getFilesProduct(id: number = 1) {
    files.value = await api.getFilesProduct(id)
  }

  async function sendFile() {
    if (!selectedFiles.value.length) {
      return
    }
    for (const file of selectedFiles.value) {
      try {
        const base64 = await toBase64(file)
        const data = {
          filename: file.name,
          idProduct: 1,
          originalname: file.name,
          mimeType: file.type,
          size: file.size,
          link: '',
          base64,
        }
        await api.createFile(data)
        files.value.push(data)
      } catch (error) {
        console.log(error)
      }
    }
    selectedFiles.value = []
  }

  function onChangeFiles(e) {
    selectedFiles.value = e.target.files
  }

  return {
    files,
    images,
    selectedFiles,
    sendFile,
    getFilesProduct,
    onChangeFiles,
  }
}
