<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFetchCandles } from '@/composables/useFetchCandles'
import { useFetchDiffusers } from '@/composables/useFetchDiffusers'
import { useFetchSachets } from '@/composables/useFetchSachets'
import { groupProduct } from '@/interfaces/Product'
import { computed, ref, watch } from 'vue'
import { useProduct } from '../Product/composables/useProduct'
import type { IProductBase } from '@/interfaces/Product'

const { items: itemsSachets, getSachets, isLoading: isLoadingSachets } = useFetchSachets()
const { items: itemsCandles, getCandles, isLoading: isLoadingCandles } = useFetchCandles()
const { items: itemsDiffusers, getDiffusers, isLoading: isLoadingDiffusers } = useFetchDiffusers()
const { products, selectedProduct } = useProduct()
const items = ref<IProductBase[]>([])

const isLoading = computed(() => isLoadingSachets.value || isLoadingCandles.value || isLoadingDiffusers.value)

watch(selectedProduct, async value => {
  if (value === groupProduct.candles) {
    await getCandles()
    items.value = itemsCandles.value
  } else if (value === groupProduct.diffusers) {
    await getDiffusers()
    items.value = itemsDiffusers.value
  } else if (value === groupProduct.sachets) {
    await getSachets()
    items.value = itemsSachets.value
  }
})
</script>

<template>
  <div class="p-10">
    <Select v-model="selectedProduct">
      <SelectTrigger class="w-full">
        <SelectValue placeholder="Выберите продукт" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Выберите продукт</SelectLabel>
          <SelectItem v-for="product of products" :key="product.id" :value="product.id">
            {{ product.text }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <div v-if="isLoading">
      isLoading...
    </div>
    <div v-else>
      {{ items }}
    </div>
  </div>
</template>
