import { useApi } from '@/composables/useApi'

export interface ProductFile {
  filename: string
  idProduct: number
  originalname: string
  mimeType: string
  size: number
  link: string
  base64: string

}

export function filesApi() {
  const api = useApi()

  async function createFile(data: ProductFile): Promise<unknown> {
    if (!api.value) {
      return
    }
    return await api.value.post('files/product', data)
  }

  async function getFilesProduct(id: number): Promise<ProductFile[]> {
    if (!api.value) {
      return []
    }
    return (await api.value.get(`files/product/${id}`, {
    })).data
  }

  return {
    createFile,
    getFilesProduct,
  }
}
