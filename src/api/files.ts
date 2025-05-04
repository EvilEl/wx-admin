import { axiosInstance } from './'

export interface ProductFile {
  filename: string
  idProduct: number
  originalname: string
  mimeType: string
  size: number
  link: string
  base64: string

}

export const filesApi = {
  createFile: async (data: ProductFile): Promise<unknown> => {
    return await axiosInstance.post('files/product', data)
  },

  getFilesProduct: async (id: number): Promise<ProductFile[]> => {
    return (await axiosInstance.get(`files/product/${id}`, {

    })).data
  },

}
