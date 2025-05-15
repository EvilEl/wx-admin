import { ref } from 'vue'
import type { keyGroupProduct } from '@/composables/useCreateProduct'

export interface Product {
  id: keyGroupProduct
  text: string
}

export function useProduct() {
  const products: Product[] = [
    { id: 'candles', text: 'Свечи' },
    { id: 'diffusers', text: 'Диффузоры' },
    { id: 'sachets', text: 'Саше' },
  ]

  const selectedProduct = ref('')

  return {
    products,
    selectedProduct,
  }
}
