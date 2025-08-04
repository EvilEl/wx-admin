import { useApi } from '@/composables/useApi'

export interface ProductFile {
  id: number
  filename: string
  idProduct: number
  originalname: string
  mimeType: string
  size: number
  link: string
  base64: string
}

export interface RemoveFileFromProduct {
  idFile: number
  idProduct: number
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

  async function removeFileFromProduct(data: RemoveFileFromProduct) {
    if (!api.value) {
      return
    }

    return await api.value.delete(`files/product/${data.idFile}/${data.idProduct}`)
  }

  return {
    createFile,
    getFilesProduct,
    removeFileFromProduct,
  }
}
