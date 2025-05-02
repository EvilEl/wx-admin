import { ref } from 'vue'

export function useProduct() {
  const products = [
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
