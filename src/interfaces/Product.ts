import type { ProductFile } from '@/api/files'

export const groupProduct = Object.freeze({
  candle: 'candle',
  diffuser: 'diffuser',
  sachet: 'sachet',
})

export type ProductType = 'candle' | 'diffuser' | 'sachet'
export interface IProductBase {
  id: number
  name: string
  count: number
  price: number
  categoryId: string
  files: ProductFile[]
}

export interface IProduct extends Omit<IProductBase, 'id'> {}

export type keyGroupProduct = keyof typeof groupProduct

export interface ICreateProduct extends IProduct {
  group: keyGroupProduct
}

export interface IProductSelect {
  id: keyGroupProduct
  text: string
}

export interface ICategory {
  id: number
  name: string
  description: string
}

export interface ICreateCategory {
  name: string
  description: string
}
