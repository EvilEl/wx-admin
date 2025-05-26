import { ref } from 'vue'
import type { IProductSelect } from '@/interfaces/Product'

export function useProduct() {
  const products: IProductSelect[] = [
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
