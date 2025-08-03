import { ref } from 'vue'
import type { IProductSelect, ProductType } from '@/interfaces/Product'

export function useProduct() {
  const products: IProductSelect[] = [
    { id: 'candle', text: 'Свеча' },
    { id: 'diffuser', text: 'Диффузор' },
    { id: 'sachet', text: 'Саш' },
  ]

  const selectedProduct = ref<ProductType | string>('')

  return {
    products,
    selectedProduct,
  }
}
