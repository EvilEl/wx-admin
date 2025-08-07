<script setup lang="ts">
import { watch } from 'vue'
import Table from '@/components/Table.vue'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useApiProduct } from '@/composables/useApiProduct'
import { useFetchProduct } from '@/composables/useFetchProduct'
import type { IProductBase } from '@/interfaces/Product'
import { useProduct } from '../Product/composables/useProduct'

const { items, getProducts, isLoading } = useFetchProduct()
const { products, selectedProduct } = useProduct()
const { updateProduct } = useApiProduct()

async function handleUpdateItem(item: IProductBase) {
  const itemIndex = items.value.findIndex(i => i.id === item.id)
  if (itemIndex !== -1) {
    items.value[itemIndex] = { ...items.value[itemIndex], ...item }
  }
  items.value = [...items.value]
  await updateProduct(item.id, {
    name: item.name,
    price: item.price,
    count: item.count,
  })
}

watch(selectedProduct, getProducts)
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
      <Table :items="items" @update:item="handleUpdateItem" />
    </div>
  </div>
</template>
